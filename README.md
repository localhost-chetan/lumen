# Lumen

A CLI-based AI coding agent that runs entirely in the terminal. Lumen helps developers generate, edit, and reason about code through a conversational or command-driven interface.

## Tech Stack

| Layer | Tool |
|---|---|
| Runtime | [Bun](https://bun.sh) |
| Language | TypeScript (strict) |
| CLI Framework | [Commander.js](https://github.com/tj/commander.js) |
| Terminal UI | [Clack](https://github.com/natemoo-re/clack) (`@clack/prompts`) |
| Architecture | Class-based OOP |
| Package Manager | Bun |

## Usage

```bash
# Run directly
bunx lumen <command>

# Via npx
npx lumen <command>

# Or if installed globally
bun install -g lumen
lumen <command>
```

## Commands

| Command | Description |
|---|---|
| `create` | Generate new code or files |
| `edit` | Modify existing code |
| `run` | Execute scripts or commands |

## Installation

```bash
bun add lumen
```

## Development

```bash
# Install dependencies
bun install

# Run in dev mode with hot reload
bun run dev
```

## Configuration

Config is loaded once at startup. Supported sources (in priority order):

CLI flags → environment variables → config file (`.agentrc` or `agent.config.ts`) → defaults

API keys and secrets must come from environment variables — never hardcoded.

## Testing

```bash
bun test
```

## Project Structure

```
├── src/
│   ├── index.ts                  # Entry point — registers Commander commands
│   ├── agent/
│   │   ├── Agent.ts              # Core agent class — orchestrates LLM calls
│   │   ├── ConversationManager.ts  # Manages message history and context window
│   │   └── ToolRunner.ts         # Executes tools/functions the agent can call
│   ├── commands/
│   │   ├── create.ts             # "create" command handler
│   │   ├── edit.ts               # "edit" command handler
│   │   └── run.ts                # "run" command handler
│   ├── ui/
│   │   └── prompts.ts            # All Clack-based UI — spinners, confirms, text inputs
│   ├── config/
│   │   └── ConfigLoader.ts       # Reads and validates config from disk or env
│   └── utils/
│       └── fileUtils.ts          # File read/write helpers using Bun APIs
├── package.json
├── tsconfig.json
└── README.md
```

**Note:** This project uses **Bun**, not Node.js. All I/O uses Bun-native APIs (`Bun.file()`, `Bun.write()`, `Bun.spawn()`).
