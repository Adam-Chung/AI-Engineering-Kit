#!/usr/bin/env node
"use strict";

/**
 * Cross-platform framework validator.
 *
 * This is the canonical implementation. `validate-framework.ps1` is a thin
 * wrapper that delegates here so the check logic exists in exactly one
 * place. Requires only Node.js (no dependencies).
 *
 * Usage:
 *   node validators/validate-framework.js
 *
 * Exit code 0 on success, 1 if any check fails.
 */

const fs = require("fs");
const path = require("path");

const frameworkRoot = path.resolve(__dirname, "..");
const errors = [];

const requiredPaths = [
  "README.md",
  "VERSION",
  "workspace/AGENTS.md",
  "workspace/CLAUDE.md",
  "shared/AI_COLLABORATION.md",
  "shared/profiles/PERSONAL_PROFILE.md",
  "shared/profiles/TECHNICAL_PROFILE.md",
  "shared/workflow/DYNAMIC_WORKFLOW.md",
  "shared/rules/DEVELOPMENT_RULES.md",
  "shared/rules/CODE_REVIEW.md",
  "shared/rules/DOCUMENTATION_RULES.md",
  "shared/rules/DEBUG_RULES.md",
  "shared/rules/DECISION_RULES.md",
  "shared/rules/LEARNING_MODE.md",
  "shared/rules/PUBLIC_DATA_COMPLIANCE.md",
  "templates/project/PROJECT_CONTEXT.md",
  "templates/project-agent-state/CURRENT_STATUS.md",
  "templates/project-agent-state/TASKS.md",
  "templates/project-agent-state/DECISIONS.md",
  "templates/project-agent-state/HANDOFF.md",
  ".agents/skills/debug-spring-boot/SKILL.md",
  ".agents/skills/debug-spring-boot/agents/openai.yaml",
  ".agents/skills/debug-spring-boot/evals/evals.json",
  ".claude/agents/planner.md",
  ".claude/agents/architect.md",
  ".claude/agents/implementer.md",
  ".claude/agents/reviewer.md",
  ".claude/agents/writer.md",
  "evals/workspace-routing.json",
  "docs/ARCHITECTURE.md",
  ".github/workflows/validate.yml",
  ".githooks/pre-commit",
];

function abs(relativePath) {
  return path.join(frameworkRoot, relativePath);
}

function readFile(relativePath) {
  return fs.readFileSync(abs(relativePath), "utf8");
}

// 1. Required files must exist.
for (const relativePath of requiredPaths) {
  if (!fs.existsSync(abs(relativePath)) || !fs.statSync(abs(relativePath)).isFile()) {
    errors.push(`Missing required file: ${relativePath}`);
  }
}

// 2. Skill and agent frontmatter, and TODO placeholders.
const skillsRoot = abs(".agents/skills");
let skillFiles = [];
if (fs.existsSync(skillsRoot)) {
  skillFiles = findFiles(skillsRoot, (name) => name === "SKILL.md");
}

const agentsRoot = abs(".claude/agents");
let agentFiles = [];
if (fs.existsSync(agentsRoot)) {
  agentFiles = findFiles(agentsRoot, (name) => name.endsWith(".md"));
}

const frontmatterPattern = /^---\r?\nname:\s*[a-z0-9-]+\r?\ndescription:\s*.+?\r?\n---/s;

for (const definitionFile of [...skillFiles, ...agentFiles]) {
  const content = fs.readFileSync(definitionFile, "utf8");
  const relativePath = path.relative(frameworkRoot, definitionFile);

  if (!frontmatterPattern.test(content)) {
    errors.push(`Invalid frontmatter: ${relativePath}`);
  }
  if (/\[TODO[:\]]/.test(content)) {
    errors.push(`Unresolved TODO placeholder: ${relativePath}`);
  }
}

// 3. Eval files: at least two cases; skill evals must name a skill.
let evalFiles = [];
if (fs.existsSync(skillsRoot)) {
  evalFiles = evalFiles.concat(
    findFiles(skillsRoot, (name) => name.endsWith(".json")).filter((p) =>
      p.split(path.sep).includes("evals")
    )
  );
}
const evalsRoot = abs("evals");
if (fs.existsSync(evalsRoot)) {
  evalFiles = evalFiles.concat(
    fs
      .readdirSync(evalsRoot)
      .filter((name) => name.endsWith(".json"))
      .map((name) => path.join(evalsRoot, name))
  );
}

for (const evalFile of evalFiles) {
  const relativePath = path.relative(frameworkRoot, evalFile);
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(evalFile, "utf8"));
  } catch (err) {
    errors.push(`Invalid eval JSON: ${relativePath}`);
    continue;
  }
  if (!Array.isArray(parsed.cases) || parsed.cases.length < 2) {
    errors.push(`Eval file requires at least two cases: ${relativePath}`);
  }
  if (evalFile.includes(`${path.sep}.agents${path.sep}skills${path.sep}`) && !parsed.skill) {
    errors.push(`Skill eval file requires a skill name: ${relativePath}`);
  }
}

// 4. VERSION file must be a single non-empty semantic-looking token.
const versionPath = abs("VERSION");
if (fs.existsSync(versionPath)) {
  const version = fs.readFileSync(versionPath, "utf8").trim();
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    errors.push(`VERSION must be a semantic version (e.g. 0.1.0), found: "${version}"`);
  }
}

function findFiles(root, matchFn) {
  const results = [];
  const stack = [root];
  while (stack.length > 0) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (matchFn(entry.name)) {
        results.push(full);
      }
    }
  }
  return results;
}

if (errors.length > 0) {
  for (const message of errors) {
    console.error(`ERROR: ${message}`);
  }
  process.exit(1);
}

console.log(
  `Framework validation passed: ${requiredPaths.length} required files, ${skillFiles.length} Skill, ${agentFiles.length} agent, ${evalFiles.length} eval files.`
);
