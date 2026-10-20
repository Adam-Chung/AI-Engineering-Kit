# AI Engineering Kit

AI Engineering Kit 是一套可重用的 AI-assisted engineering workspace framework，
用來統一 Codex、Claude 等 AI coding tools 的協作規範、任務流程、專業 Skills、
角色分工、專案模板與自動驗證。

它適合希望讓 AI coding workflow 從「每次重新解釋需求」進化成可維護、可驗證、
可跨專案沿用工程系統的個人開發者與團隊。

## 核心功能

| 功能 | 解決的問題 | 主要內容 |
|---|---|---|
| 統一協作規範 | 不同 AI tools 回應方式與品質不一致 | `shared/AI_COLLABORATION.md`、開發／審查／除錯／文件規則 |
| 動態工作流程 | 任務複雜度不同，固定流程容易過重或不足 | `DYNAMIC_WORKFLOW.md` 依風險、範圍與證據需求調整執行深度 |
| 專業 Skills | 常見工程任務需要重複說明規則 | Spring Boot、REST API、Angular Signals、程式庫導讀、知識整理與 Git commit 等 Skills |
| 多角色協作 | 規劃、實作、審查與文件工作容易混在一起 | Architect、Planner、Implementer、Reviewer、Writer agent templates |
| 專案啟動模板 | 新專案缺少一致的 context 與狀態紀錄 | `PROJECT_CONTEXT.md` 與 CURRENT_STATUS／TASKS／DECISIONS／HANDOFF templates |
| Context 管理 | 長任務容易遺失決策、證據與進度 | context-management rules 與 agent-state files |
| 品質驗證 | 文件、Skills 或 routing 設定容易產生結構漂移 | Node／PowerShell validators、routing evals 與 GitHub Actions |
| 多工具接入 | 各 AI coding tool 的 discovery 機制不同 | `workspace/AGENTS.md`、`workspace/CLAUDE.md` adapters |

## 內建 Skills

- Angular Signals state-management conventions。
- Spring Boot debugging、transaction、time handling、error handling、naming、comments
  與 general code conventions。
- REST resource、URL、HTTP method/status 與 PATCH tri-state design。
- Codebase architecture 與 design-pattern 導讀。
- Development knowledge capture 與 interview-oriented notes。
- Traditional Chinese technical writing。
- Evidence-based Git commit message writing。

每個 Skill 都以 `SKILL.md` 定義觸發條件與操作規範；複雜 Skill 可搭配
`references/`、`agents/` 與 `evals/`，讓規則、執行方式與驗證案例一起版本化。

## Workspace 架構

```text
ai-engineering-kit/
├─ shared/
│  ├─ AI_COLLABORATION.md       # 跨工具協作原則
│  ├─ profiles/                 # 可自行填寫的本機 context templates
│  ├─ rules/                    # 開發、審查、除錯、文件與決策規則
│  └─ workflow/                 # 動態工作流程
├─ .agents/skills/              # Codex Skills
├─ .claude/agents/              # Claude role templates
├─ workspace/                   # Workspace-level adapters
├─ templates/                   # Project 與 agent-state templates
├─ evals/                       # Routing cases
├─ validators/                  # 結構與內容檢查
└─ .github/workflows/           # 自動驗證
```

## 快速開始

1. 將 repository clone 到 workspace 中的 `ai-engineering-kit/`。
2. 依使用工具的 discovery 規則，將 `workspace/AGENTS.md` 與
   `workspace/CLAUDE.md` 接到 workspace root；Windows 可使用 symbolic link
   或 junction。
3. 依需求填寫 `shared/profiles/` templates，並避免提交個資、credentials、
   客戶資訊或公司內部內容。
4. 從 `templates/project/PROJECT_CONTEXT.md` 建立專案 context；長期任務可再加入
   `templates/project-agent-state/` 中的狀態文件。
5. 執行驗證：

```shell
node validators/validate-framework.js
node validators/validate-public.js
```

`validate-framework.js` 會檢查必要檔案、Skill metadata、agent templates 與 eval
結構。`validate-public.js` 會補充檢查 symlink、敏感內容 patterns 與不應出現的路徑。

## 使用原則

- 以實際 source、Git state、tests 與 runtime evidence 為準，不把計畫文件當成完成證據。
- 先確認 repository boundary，再進行 staging、commit 或 push。
- 對 secrets、個資、第三方資料與授權採 fail-closed 策略。
- 將 Skills 寫成範圍明確、可觸發、可測試且能隨專案演進的工作單元。
- AI 提供分析與執行力；產品、風險與不可逆決策仍保留 human gate。

## 安全、貢獻與授權

- 安全問題請依 [SECURITY.md](SECURITY.md) 回報，不要在 issue 中貼出 secrets、
  個資或 exploit details。
- Issue 與文件改善建議歡迎依 [CONTRIBUTING.md](CONTRIBUTING.md) 提交。
- 第三方資料、網站 automation 與素材仍需逐項確認 Terms、license、privacy、
  rate limits、attribution 與 redistribution rights。
- 本 repository 採用 [Personal Non-Commercial License 1.0](LICENSE)：自然人可
  下載、學習、執行及為自己進行私人修改，但不得用於工作、公司／組織、營利、
  代客或 hosted-service 用途，也不得再散布原始或修改內容。這是
  **source-available** 授權，不是 Open Source。

---

# AI Engineering Kit (English)

AI Engineering Kit is a reusable AI-assisted engineering workspace framework
for consistent collaboration rules, adaptive workflows, specialized Skills,
role-based agents, project templates, and automated validation across coding
tools such as Codex and Claude.

It helps individual developers and teams turn repeated prompting conventions
into a maintainable, testable engineering system that can be reused across
projects.

## Core Capabilities

| Capability | Problem addressed | Included components |
|---|---|---|
| Shared collaboration rules | Coding tools otherwise behave inconsistently | Collaboration, development, review, debugging, documentation, and decision rules |
| Adaptive workflow | One fixed process is either too heavy or too shallow | Risk- and scope-aware execution guidance in `DYNAMIC_WORKFLOW.md` |
| Specialized Skills | Recurring engineering tasks require repeated instructions | Spring Boot, REST API, Angular Signals, codebase explanation, knowledge capture, and Git Skills |
| Role-based agents | Planning, implementation, review, and writing need distinct focus | Architect, Planner, Implementer, Reviewer, and Writer templates |
| Project bootstrap templates | New projects lack stable context and state records | Project context plus status, task, decision, and handoff templates |
| Context management | Long-running tasks lose decisions and evidence | Context-management rules and agent-state files |
| Deterministic validation | Documentation and Skill structure can drift | Node/PowerShell validators, routing evals, and GitHub Actions |
| Multi-tool adapters | Tool discovery conventions differ | Workspace-level `AGENTS.md` and `CLAUDE.md` adapters |

## Included Skills

- Angular Signals state-management conventions.
- Spring Boot debugging, transactions, time handling, error handling, naming,
  comments, and general code conventions.
- REST resource, URL, HTTP method/status, and PATCH tri-state design.
- Codebase architecture and design-pattern explanation.
- Development knowledge capture for interview-oriented notes.
- Traditional Chinese technical writing.
- Evidence-based Git commit message writing.

Each Skill uses `SKILL.md` to define its trigger and operating contract.
Complex Skills may also include `references/`, `agents/`, and `evals/`, keeping
guidance, execution behavior, and evaluation cases versioned together.

## Workspace Structure

```text
ai-engineering-kit/
|- shared/                      # Cross-tool rules, profiles, and workflow
|- .agents/skills/              # Codex Skills
|- .claude/agents/              # Claude role templates
|- workspace/                   # Workspace-level adapters
|- templates/                   # Project and agent-state templates
|- evals/                       # Routing cases
|- validators/                  # Structural and content checks
`- .github/workflows/           # Automated validation
```

## Quick Start

1. Clone the repository as `ai-engineering-kit/` inside your workspace.
2. Connect `workspace/AGENTS.md` and `workspace/CLAUDE.md` to the workspace root
   according to each tool's discovery rules. On Windows, use a symbolic link or
   junction when appropriate.
3. Complete the templates under `shared/profiles/` while keeping credentials,
   personal data, customer information, and internal company material out of
   version control.
4. Create project context from `templates/project/PROJECT_CONTEXT.md`; add the
   agent-state templates for longer-running work.
5. Run the validators:

```shell
node validators/validate-framework.js
node validators/validate-public.js
```

`validate-framework.js` checks required files, Skill metadata, agent templates,
and eval structure. `validate-public.js` adds checks for symbolic links,
sensitive-content patterns, and forbidden paths.

## Operating Principles

- Treat source, Git state, tests, and runtime evidence as authoritative.
- Confirm repository boundaries before staging, committing, or pushing.
- Handle secrets, personal data, third-party data, and licensing fail closed.
- Keep Skills focused, discoverable, testable, and maintainable.
- Preserve human gates for product, risk, and irreversible decisions.

## Security, Contributions, and License

- Follow [SECURITY.md](SECURITY.md) for security reports. Do not post secrets,
  personal data, or exploit details in an issue.
- Issues and documentation improvements are welcome under
  [CONTRIBUTING.md](CONTRIBUTING.md).
- Third-party data, website automation, and assets require case-specific review
  of Terms, licensing, privacy, rate limits, attribution, and redistribution
  rights.
- This repository uses the [Personal Non-Commercial License 1.0](LICENSE).
  Individuals may download, study, run, and privately modify it for personal
  non-commercial purposes. Employment, organizational, commercial, client,
  hosted-service, and redistribution uses are prohibited. This is a
  **source-available** license, not an Open Source license.
