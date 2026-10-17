# Context-first Computing discussion

The existing Cloudflare **Pages** project serves the discussion through Pages
Functions; no second Worker project or external comment provider is required.
Only the book preview branch is changed. Production is not deployed here.

## Activate in the preview environment

1. Create a Cloudflare D1 database named `clearstudio-discussion-preview`.
2. In **Workers & Pages → clearstudio-landing → Settings → Bindings**, select
   **Preview** and add a **D1 database** binding:
   - Variable name: `DISCUSSION_DB`
   - Database: `clearstudio-discussion-preview`
3. In the same project's preview **Variables and Secrets**, add a **secret**
   named `DISCUSSION_MODERATION_KEY`. Use a randomly generated key of at least
   32 characters, stored in your password manager. Do not commit it or paste it
   into a public issue, URL or client environment variable.
4. Redeploy the preview branch. The functions initialise their tables safely
   on first use. No manual SQL migration is needed.
5. Check `/api/context-discussion` returns `available: true`. Submit a test
   contribution, verify it is absent publicly, approve it, then verify it is
   visible from a separate browser. Hide the test conversation afterwards.

For production activation, repeat with a **separate** production D1 database
and moderation key when the user authorises the production release. Preview
contributions must not be copied into the live database.

## Moderation

Open `/projects/context-first-computing/discussion/moderate` on the same
deployment. Enter the moderation key; it stays in memory only. The author can:

- Review the pending queue and approve or hide each contribution.
- Reply to an approved conversation, or start a new one, with an author badge.
- Hide a published conversation and its replies, or hide an individual reply.

The public form does not collect email or create accounts. All reader
contributions, including replies, are pending until approved. Names and text
are plain text; React escapes markup. Author badges are assigned server-side
only to authenticated author contributions. Readers consent to public display.

The server uses same-origin mutation requests, bounded JSON payloads, prepared
SQL statements, an idempotency ID, a honeypot and a five-submission hourly rate
limit per connection. Raw IP addresses are never persisted: short-lived salted
hash buckets expire and are cleaned on subsequent submissions. This is basic
spam protection; monitor actual use before deciding on further measures.

Until both preview bindings are configured, the page explicitly says the
discussion is not accepting contributions and disables the form. It never
pretends to save a contribution to browser-local storage.

## Checks

```sh
npm run build
npx tsc --noEmit -p tsconfig.app.json
npx vitest run --config vitest.discussion.config.ts
npx vitest run src/components/ContextDiscussion.test.tsx
```

Server tests run real SQLite through a D1-compatible adapter and exercise
public visibility, moderation, replies, request validation and rate limiting.
