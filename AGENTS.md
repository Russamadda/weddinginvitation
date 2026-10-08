# Reconstruction rules

- `/Reference` is read-only source material. Never delete, rename, reorganize, modify, or overwrite its contents.
- Canva screenshots are the visual source of truth. Inspect exported HTML for exact measurements and asset references.
- Never copy Canva DOM, generated classes or IDs, runtime JavaScript, or generated CSS into production.
- Implement production UI cleanly in React and standard CSS. Production must not depend on `/Reference`.
- Visual fidelity takes priority over redesign or interface improvements.
- Home, Love Story, Details, FAQ, RSVP, invitation links, admin, server reply storage, and envelope link-preview metadata are authorized. English and Norwegian guest translations are authorized and implemented; Lithuanian remains pending translation. The temporary guest language preview switcher is authorized. Admin may store language choices and must identify any unavailable translation.
- Do not change sections that already match without a clear reason.
- Use browser screenshots to verify desktop and mobile layouts and correct visible differences.
- Avoid unnecessary abstractions, dependencies, generated metadata, and utility files.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
