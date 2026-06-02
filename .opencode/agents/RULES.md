## Project Overview

This is a CLI-based AI coding agent built with **Bun** and **TypeScript**. It runs entirely in the terminal and helps developers generate, edit, and reason about code through a conversational or command-driven interface. The agent is structured around TypeScript classes, uses **Commander** for command parsing, and **Clack** for terminal UI interactions (prompts, spinners, progress indicators).

---

## Tech Stack

| Layer | Tool |
|---|---|
| Runtime | Bun (not Node.js — use Bun APIs where applicable) |
| Language | TypeScript (strict mode preferred) |
| CLI Framework | Commander.js |
| Terminal UI | Clack (`@clack/prompts`) |
| Architecture | TypeScript classes (OOP, not functional modules) |
| Package Manager | Bun (`bun install`, `bun run`) |

---

## Architecture Principles

- **Class-based design**: Every major concern is a class. No loose exported functions acting as subsystems.
- **Single responsibility**: Each class owns one domain — e.g., `Agent`, `ConversationManager`, `ToolRunner`, `FileEditor`, `ConfigLoader`.
- **Dependency injection over singletons**: Classes receive their dependencies via constructors, not global imports.
- **Bun-native I/O**: Use `Bun.file()`, `Bun.write()`, and `Bun.spawn()` instead of Node's `fs` or `child_process` unless there's no Bun equivalent.
- **Async/await throughout**: No callbacks. No `.then()` chains unless unavoidable.

---

## Project Structure (expected)

```
project-root/
├── src/
│   ├── index.ts              # Entry point — registers Commander commands
│   ├── agent/
│   │   ├── Agent.ts          # Core agent class — orchestrates LLM calls
│   │   ├── ConversationManager.ts  # Manages message history and context window
│   │   └── ToolRunner.ts     # Executes tools/functions the agent can call
│   ├── commands/
│   │   ├── create.ts         # "create" command handler
│   │   ├── edit.ts           # "edit" command handler
│   │   └── run.ts            # "run" command handler
│   ├── ui/
│   │   └── prompts.ts        # All Clack-based UI — spinners, confirms, text inputs
│   ├── config/
│   │   └── ConfigLoader.ts   # Reads and validates config from disk or env
│   └── utils/
│       └── fileUtils.ts      # File read/write helpers using Bun APIs
├── RULES.md                  # This file
├── package.json
├── tsconfig.json
└── bunfig.toml               # Bun configuration (if applicable)
```

> If the current structure differs, follow the existing layout — don't reorganize unless explicitly asked.

---

## CLI Design

- Commands are registered in `src/index.ts` using Commander's `.command()` API.
- Each command is defined in its own file under `src/commands/`.
- Command handlers are thin — they parse args/options, instantiate the relevant class, and delegate.
- All interactive terminal output goes through Clack (`@clack/prompts`). Do not use raw `console.log` for user-facing UI — use `clack.log.info()`, `clack.log.error()`, `clack.spinner()`, etc.
- Non-interactive output (e.g., piped output, `--json` flags) bypasses Clack and writes to stdout directly.

---

## Agent Behavior

- The `Agent` class is the central orchestrator. It holds a reference to the LLM client, the conversation history, and the tool registry.
- The agent loop: receive input → build prompt with context → call LLM → parse response → execute tools if needed → return output.
- Tool calls are handled by `ToolRunner`. Each tool is a method or a registered handler — not inline logic inside `Agent`.
- Conversation context is managed by `ConversationManager`, which is responsible for trimming history to fit context window limits.

---

## Code Generation Rules

When generating or modifying code in this project:

1. **Always use TypeScript classes** for new subsystems. Do not introduce standalone utility functions as the primary abstraction.
2. **Use Bun APIs** for file system, process spawning, and environment access. Avoid `require('fs')` or `require('child_process')`.
3. **Use Clack** for all terminal UI. Do not introduce other UI libraries (chalk alone, ora, inquirer, etc.).
4. **Commander** handles all CLI argument parsing. Do not parse `process.argv` manually.
5. **No `any` types** unless wrapping an external library boundary where types are genuinely unavailable.
6. **Error handling**: throw typed errors or use a `Result`-style pattern. Do not silently swallow errors.
7. **Imports**: use named imports. Avoid default exports except for the entry class of a module.
8. **Environment variables**: always accessed through `ConfigLoader`, never inline `process.env.XYZ` scattered across files.

---

## Configuration

- Config is loaded once at startup via `ConfigLoader`.
- Supported config sources (in priority order): CLI flags → environment variables → config file (`.agentrc` or `agent.config.ts`) → defaults.
- API keys and secrets must come from environment variables. Never hardcode them.

---

## Testing

- Test runner: `bun test`
- Test files colocated with source or under `src/__tests__/`
- Focus tests on class methods and agent behavior, not CLI plumbing.

---

## What This Agent Should NOT Do

- Do not refactor the class-based architecture into hooks, functional modules, or React-style patterns.
- Do not introduce a build step (webpack, esbuild config, etc.) — Bun handles this natively.
- Do not add a web server, HTTP layer, or browser UI. This is a terminal-only tool.
- Do not switch the package manager to npm or yarn.