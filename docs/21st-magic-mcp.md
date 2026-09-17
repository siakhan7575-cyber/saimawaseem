# 21st.dev Magic — MCP setup

[21st.dev Magic](https://21st.dev/install) is an MCP server that generates and
refines React / UI components from natural-language prompts. It's wired into
this repo through the project-scoped [`.mcp.json`](../.mcp.json), so any MCP
client that reads that file (Claude Code, Cursor, etc.) picks it up
automatically.

## 1. Get an API key

Sign in at <https://21st.dev/install>, create a Magic API key, and copy it.

## 2. Expose the key as an environment variable

The config reads the key from `TWENTYFIRST_API_KEY` so it is **never committed**
to the repo. Add it to your shell profile (e.g. `~/.zshrc` / `~/.bashrc`):

```bash
export TWENTYFIRST_API_KEY="your-magic-api-key"
```

Reload your shell (`source ~/.zshrc`) so the variable is available.

## 3. Use it

Open this project in Claude Code (or another MCP client). The `magic` server
starts on demand via `npx`, so no global install is required. Then prompt it
to scaffold or edit components, for example:

```
/ui a responsive pricing section with three tiers
```

## Notes

- The server is launched with `npx -y @21st-dev/magic@latest`, which always
  runs the latest published version.
- If you prefer a global/manual install, the equivalent Claude Code command is:

  ```bash
  claude mcp add magic -- npx -y @21st-dev/magic@latest
  ```

  then set `TWENTYFIRST_API_KEY` in your environment as above.
