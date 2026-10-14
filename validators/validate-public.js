#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const repositoryRoot = path.resolve(__dirname, "..");
const errors = [];
const requiredFiles = [
  "README.md",
  "SECURITY.md",
  "CONTRIBUTING.md",
  "LICENSE_STATUS.md",
  "shared/profiles/PERSONAL_PROFILE.md",
  "shared/profiles/TECHNICAL_PROFILE.md"
];
const forbiddenPaths = [
  ".archify",
  ".obsidian",
  ".agents/skills/archify",
  "docs/agent",
  "public-release",
  "scripts/export-public.mjs",
  "scripts/verify-public-export.mjs"
];
const blockedRules = [
  { id: "absolute-windows-user-directory", pattern: /[A-Za-z]:\\Users\\/i },
  { id: "absolute-unix-user-directory", pattern: /\/(?:Users|home)\/[^/\s]+\// },
  { id: "aws-access-key", pattern: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/ },
  { id: "github-token", pattern: /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/ },
  { id: "private-key", pattern: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/ },
  { id: "slack-token", pattern: /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/ },
  { id: "jwt", pattern: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/ }
];

/**
 * Returns every regular file without following symbolic links.
 * @param {string} root directory to inspect
 * @returns {string[]} absolute file paths
 */
function listFiles(root) {
  const files = [];
  const stack = [root];
  while (stack.length > 0) {
    const directory = stack.pop();
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (directory === repositoryRoot && entry.name === ".git") {
        continue;
      }
      const absolutePath = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) {
        errors.push(`Symbolic link is forbidden: ${path.relative(repositoryRoot, absolutePath)}`);
      } else if (entry.isDirectory()) {
        stack.push(absolutePath);
      } else if (entry.isFile()) {
        files.push(absolutePath);
      }
    }
  }
  return files;
}

/**
 * Reports a sensitive-content finding without printing the matched value.
 * @param {string} relativePath affected path
 * @param {string} ruleId stable rule identifier
 * @returns {void}
 */
function reportFinding(relativePath, ruleId) {
  errors.push(`Forbidden content in ${relativePath} (rule: ${ruleId}).`);
}

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(repositoryRoot, relativePath))) {
    errors.push(`Missing required Public file: ${relativePath}`);
  }
}
for (const relativePath of forbiddenPaths) {
  if (fs.existsSync(path.join(repositoryRoot, relativePath))) {
    errors.push(`Forbidden Public path exists: ${relativePath}`);
  }
}

for (const absolutePath of listFiles(repositoryRoot)) {
  const relativePath = path.relative(repositoryRoot, absolutePath).split(path.sep).join("/");
  const buffer = fs.readFileSync(absolutePath);
  if (buffer.includes(0)) {
    errors.push(`Unexpected binary content: ${relativePath}`);
    continue;
  }
  const content = buffer.toString("utf8");
  for (const rule of blockedRules) {
    if (rule.pattern.test(content)) {
      reportFinding(relativePath, rule.id);
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`ERROR: ${error}`);
  }
  process.exit(1);
}

console.log("Repository validation passed.");
