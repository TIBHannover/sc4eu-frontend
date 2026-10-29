# Mocked frontend view for multiple term data versions

## User

I have to implement multiple term's data version. I have unified commit messages in last updates, so that it always will have unique term ID. I don't want to think about real functionality now, just want to discuss mocked frontend view. You should take a look at current functionality in ExpandedRow, specifically at lines 288:582 (when term is not in editMode and not in viewAgreementMode)


## Assistant

Here's how I'd approach the mocked view for this section.

## What the current view gives us

The read-only view (`ExpandedRow.jsx:288-582`) has three parts:
- **Header bar**: the "Modified/Agreed" date, Copy URL and Close.
- **Left panel**: the term itself (status chips, label, alt labels, description, the "More technical details" accordion) and an action footer (consensus / Edit).
- **Right panel**: Discussion.

The commit messages already give us enough to build a version list:
- `Create term <id>`, `Update term <id>` + a body of `field-from: … / field-to: …` lines, and `Delete term <id>`.
- So each version could be mocked as `{ sha, author, date, header, changes: [{ field, from, to }] }`.

**There's one gap:** `ExpandedRow.jsx:88` still commits `Update ${term.label} status after consensus`. That uses the label, not the ID. Labels can change, so consensus-driven status changes would be missing from a term's history. It should become `Update term ${term.identifier}` with a `status-from/status-to` body.

## Layout options

**A. Version selector in the header bar (my suggestion)**
- Replace the plain "Modified: …" text with a small dropdown: `Version 5 of 5 (latest) · 28.10.2026 ▾`.
- Picking an older version renders that snapshot in the left panel, in the same layout.
- A banner at the top of the left panel says: *"You're viewing version 3 from 12.09.2026 by jdoe. [Back to latest]"*.
- While an old version is shown, the action footer (Start consensus / Edit) is hidden or disabled.
- The Discussion panel stays as it is, since discussions aren't versioned.

**B. "History" tab next to Discussion in the right panel**
- The right panel gets tabs: `Discussion | History`.
- History is a vertical timeline. Each entry shows avatar, author, date, the commit header and the changed fields as chips (`label`, `description`, …).
- Clicking an entry loads that snapshot into the left panel, like in A.
- This makes more use of the screen space we already have and shows the whole history at once. The cost is that History competes with Discussion for attention.

**C. A separate History dialog or drawer**
- A "History" button in the header opens a dialog with the timeline on the left and a field-by-field diff on the right.
- This is the cleanest separation, but it's the most work and adds another modal on top of a modal.

## Diff display (applies to all options)

Since commit bodies are field-based, we can show differences per field. There are two ways:
- **Inline in the left panel:** fields changed in the selected version get a "changed" marker, and hovering or expanding shows `from → to`. The old value is struck through and red, the new one green.
- **Compare mode:** a toggle that shows the selected version next to the latest one, field by field. This is more useful for long descriptions.

My suggestion is **B for navigation, plus inline diff markers in the left panel**, with the read-only banner from A. That fits the two-panel layout best and changes the existing structure the least.

## Questions before I build the mock

1. **Snapshot or changes only:** Should a version show the full term as it was then (requires rebuilding the state by replaying commits, or reading the file at that commit SHA), or only what changed in that commit? This decides whether the left panel can show an old version at all.
2. **Creation and deletion:** Should Create/Delete commits appear in the timeline? Delete only matters if the term can come back.
3. **Restore:** Is "Restore this version" in scope? It would start an edit with the old values pre-filled. That's probably a later step, but it changes the banner design.
4. **Consensus events:** Should the timeline also show consensus start/close (from the vote data), or only commits?
5. **Mobile:** On small screens the panels stack. Is a third tab acceptable there, or should history go behind a header button?

Once you've picked an option, I'll write the mock with hardcoded version data, keeping it separate so the real data can replace it later.

---

## User

Updated the gap (wasn't that critical as it committed update term.label only after consensus close by admin - happens rarely). I actually like version a - selector. Minimal and should be easy to use. I think for diff we should use compare mode (button near versions) - clicking it should give (here I am not sure of the best UI) two versions selector on the right default latest on the left one version before with possibility to select other versions for both items. Double dropdown/select, but not sure if it is available in Material-UI that I use.  
Answering your questions:
1. Don't know. I have actually written a description for this task: Description
After extending commit functionality and making commit messages unified, hence easy to parse at: 55d69f56
Next iteration for a term's data, which was also asked by users, would be showing multiple versions. Say if term's label in the past was different, we could display which value it had.
Technical details
Any update with term data will be tagged by unique UUID in commit message. There are three ways to achieve desired solution:

Filter response commits from getCommits() GitHub REST API by using desired commits hashes.




        
      (Pro) Uses only one network request;

        
      (Pro) Ensures to have latest commits data, as it is fetched from remote

        
      (Con) Unfortunately, I haven't found that REST API supports this, maybe GraphQL in a future might help;

        
      (Con) Old commits won't be returned - the ones where unified commit message structure was not implemented.


Filter git locally and send one request per each found commit using getSingleCommit() - worst solution




        
      (Pro) quick local filter

        
      (Con) huge overhead with network requests being sent in a loop one-by-one for each commit hash. GitHub REST API, as described in a first solution, doesn't support batch or multiple commits being send in a search request. Sending each commit's hash one at a time, will just create a big network bandwidth.


(Possibly best solution) Fetch all commits with getCommits() GitHub REST API, filter locally with git, locally get required file versions.




        
      (Pro) One network request to gather all commits list

        
      (Pro) State is rather fresh - taken from GitHub, before any calculation

        
      (Pro) Possibility to use cache, if remote state wasn't updated in a meantime, will only add speed to a calculation and prevent unneeded network requests

        
      (Pro) Local filter with git is very functional and quick

        
      (Con) If using cache, data has to be saved somewhere - will take disk space

        
      (Con) Depending of the place where local git filter will be run, clients have to be notified. If server runs it, there have to be a second request returning found data to frontend, if frontend (if it's possible with library similar to process or system in Java) - it should be easier  so will probably stick with third solution, where i have full local history of said term. How is it better done with git: return full snapshot or use diffs, is up for a discussion.  
2. Delete definitely - no, I will have separate tab probably later, or they would be completely removed from table. Create - maybe, as a initial version.  


## Assistant

## Compare mode UI

MUI doesn't have a double select component. Two `TextField select` fields next to each other, with a swap icon between them, do the job and are a common pattern (GitHub's compare view works like this):

```
Normal:   Version 5 of 5 (latest) · 28.10.2026 ▾   [Compare]
Compare:  [v4 · 12.10.2026 ▾]  ⇄  [v5 (latest) · 28.10.2026 ▾]   [Exit compare]
```

- This replaces the single selector in the header bar, so the header doesn't get more crowded.
- Old version on the left and new on the right is the natural reading order.
- Defaults are latest on the right and the version before it on the left.
- In each dropdown, disable the version picked in the other one, so you can't compare a version with itself.
- I wouldn't force left to be older than right. Comparing in reverse is still valid. The swap button (`SwapHorizIcon`) makes it a single click.
- If the term has only one version, disable the Compare button and add a tooltip.

**Where the diff goes:** the left panel is only 50% wide on `xl`, so putting two term views next to each other in it would be cramped. I'd show a list of fields instead, one row per field:

```
Label          ̶O̶l̶d̶ ̶l̶a̶b̶e̶l̶  →  New label        (changed)
Description    ...word-level diff, deletions red/struck, insertions green...
Status         draft → accept
─ 3 unchanged fields ▸
```

- Changed fields are expanded and unchanged ones are collapsed.
- Long descriptions need a word-level diff. Neither package has a diff library yet, so we'd add `diff` (jsdiff, `diffWords`), which is small. For the mock I can fake it with plain from/to text.

## Snapshot or diff: I'd go with snapshots

This is about what the server sends to the frontend. I'd strongly recommend full snapshots per version: `git show <sha>:<file>.ttl`, parse it, then extract the one term.

- **Comparing any two versions is trivial.** v1 against v5 is just a field-by-field comparison of two objects. With commit-body diffs, you'd have to replay every change from v1 to v5, and a single wrong or missing commit body breaks everything after it.
- **It doesn't depend on commit messages being correct.** Edits made directly on GitHub, the old label-based consensus commit, and malformed bodies all still produce a correct state.
- **Snapshots can be cached forever.** A commit SHA never changes, so the snapshot for `(sha, termId)` never goes stale. The only cache question is whether there are new commits. You already have `@octokit/webhooks` on the server, so a push webhook (or a cheap `git ls-remote` HEAD check) can trigger `git fetch`. This also answers the disk-space concern: the cache is one bare clone plus small JSON entries.
- **Old commits can be covered too, if you want.** Grepping messages for the UUID only finds commits after the unification. The snapshot approach could instead walk `git log -- file.ttl`, extract the term at each commit, and keep only the commits where the term actually changed. That's expensive the first time, but after that it's cached for good. Use `--grep` now and add the full walk later if users ask for older history. (`git log -G<uuid>` won't help here: in Turtle the UUID is only on the subject line, so changes to other properties of the term don't match.)

**Where to run git:** it has to be the Express server. A browser can't run git processes, and `isomorphic-git` would have to clone the whole repo in each client. Since the server keeps a clone that it updates with `git fetch`, you don't need `getCommits()` from the REST API. The fetch already brings in all commits. That simplifies your option 3 to: fetch the clone, grep the log, show the file at each commit, and return one response.

**Suggested response shape** (I'll use this for the mock data too):
```js
[{ sha, author, date, header, term: { label, altLabel, description, seeAlso, status, ... } }] // newest first
```
- The Create commit becomes v1 automatically. Delete commits are filtered out on the server.
- Whether to also return the commit `body` is up to you. The UI doesn't need it, because the diff is calculated from the snapshots.

## For the mock

- Add a `mockTermVersions(term)` helper that returns 4–5 fake versions, with the latest equal to the current `term`.
- Header: a version selector and a Compare button. When an older version is selected, show the read-only banner and hide the action footer.
- In compare mode, the left panel shows the field-by-field diff described above.

Should I go ahead and build it with these defaults? Two things to confirm first:
1. Should the selected version be part of the URL (`/terms/:id/versions/:sha`), like consensuses are? It fits the "Copy term URL" feature.
2. When an older version is selected, should the status chips show that version's status, or always the current one?

---

## User

1. I think yes, it should be and I would implement it later. I know that all major Git providers support it.
2. I am pretty sure it could also be shown if change happened. Say in version_a status was draft, in version_b it's accepted

---

## Assistant

I built the mocked version view for the read-only mode of `ExpandedRow`, with the selector and the compare mode we discussed. ESLint passes on the new files and the build succeeds without warnings from them. I haven't opened it in the browser yet, so the layout (especially on mobile) still needs a look from you.

## New files

- **`utils/TermVersions.js`**
  - `mockTermVersions(term)` makes up a fixed history of up to 5 versions in the response shape we agreed on. Version 1 is a Create commit. Each later version changes one field (label → alt labels → description → status or seeAlso). Versions identical to the one before are dropped, and the latest version always equals the current term.
  - `diffTermVersions(fromTerm, toTerm)` compares two versions field by field.
  - It also holds `VERSIONED_FIELDS`, `STATUS_CHIP_VARIANTS` and `formatVersionDate`.
- **`components/TermVersionsToolbar.jsx`**
  - **Normal mode:** a `Version` dropdown and a `Compare` button. The button is disabled with a tooltip when the term has only one version.
  - **Compare mode:** `[From ▾] ⇄ [To ▾] [Exit compare]`. Each dropdown disables the version picked in the other one. Each entry shows the version number, "(latest)", date, author and which fields changed.
  - The double select is just two MUI `TextField select` fields with a `SwapHoriz` button between them.
- **`components/TermVersionsCompare.jsx`**
  - Changed fields show the old value (red, struck through) above the new one (green).
  - Status is shown with the same coloured chips as elsewhere.
  - Unchanged fields are collapsed into an "N unchanged fields" section.

## Changes in `ExpandedRow.jsx`

- **Header:** the toolbar replaces the "Modified/Agreed: date" text, since the selected version already shows its date. **This drops the "Agreed" vs "Modified" wording.** If you want it back, I can add it to the selected-value text.
- **Older version selected:**
  - An info banner appears ("You are viewing version N from … by …") with a **Back to latest** button.
  - Label, alt labels, description, seeAlso and the status chip all show that version's values, so a draft → accepted change shows up as you described.
  - The "Pending Consensus" and "Check last consensus" chips and the action footer only appear on the latest version.
- **Compare mode:** the left panel is replaced by the field-by-field comparison. By default, "From" is the version before the latest and "To" is the latest. The Discussion panel doesn't change.
- `renderSeeAlso` now takes the term it should render as an argument.

## Left for later

- **Real data:** swap the `useMemo(() => mockTermVersions(term), ...)` call in `ExpandedRow` for the server request. The components only rely on the response shape.
- **URL:** the selected version isn't part of the URL yet, as you said you'd do that later.
- **Word-level diff:** long descriptions still show the full old and new text. There's a `MOCK` comment in `TermVersionsCompare` marking where it would go.
- **Commit header:** your consensus fix commits `Update ${term.identifier} status after consensus` (`ExpandedRow.jsx:88`). Searching by UUID finds it, but a parser that looks for the `Update term <id>` prefix would miss it.

I didn't touch the existing formatting issues in `ExpandedRow.jsx` (two missing semicolons and trailing spaces around lines 190–221). I also left your uncommitted changes to the service worker as they were.

---

## User

So I like UI side of comparison and latest version. While you are working with ExpandedRow, add hard-coded Typographies, just as with alternative labels, identifiers, etc to 'label' and 'description'. Also in VoteView. I understood that it is not really visible, what fields are them. And I wanted to give some comments of your implementation of terms compare and history, but really after looking at other examples (GitHub for example, my initial impression was that it is better to have version_to on top and version_from beneath - in compare view. But GitHub and GitLab actually has same as you implemented. Other than that, I think solution is great. You could take a look if you think there are some small adjustments, but overall I think this mock-up is enough. 

--- 

## Assistant

I added "Label:" and "Description:" headings to `ExpandedRow` and `VoteView`, plus two small fixes to the version mock. The build succeeds; I haven't looked at it in the browser.

**Field headings**
- **`ExpandedRow`:** "Label:" sits between the status chips and the big title, and "Description:" sits above the description block. Both use the same style as the "Alternative Label N:" headings.
- **`VoteView`:** "Label:" sits above the term name and info icon, and "Description:" above the description box. The text style matches, adjusted to that view's own styling.

**Small fixes**
1. **Mobile toolbar:** the version selector is now full width on small screens. Before, it was set to fill its container, but the container only took as much space as its content, so the width could come out wrong.
2. **Compare mode after a refresh:** if a selected version is gone after the version list is reloaded (e.g. after saving an edit), compare mode now falls back to the defaults (latest and the one before it). Before, the comparison would have been blank and MUI would have warned about an invalid dropdown value.

On the compare order: I agree with GitHub and GitLab. Old version above new reads as a timeline and matches how diffs are usually shown (`-` before `+`).

I left the existing ESLint warning in `VoteView.jsx:57` (missing `term.identifier` in the `useEffect` dependencies) and the unformatted long tooltip line, which I only re-indented.

---

## User

Regarding this message of yours:
Where to run git: it has to be the Express server. A browser can't run git processes, and isomorphic-git would have to clone the whole repo in each client. Since the server keeps a clone that it updates with git fetch, you don't need getCommits() from the REST API. The fetch already brings in all commits. That simplifies your option 3 to: fetch the clone, grep the log, show the file at each commit, and return one response.  I have middle layer server, inside frontend, which I use to perform calls on a backend. Should I place git calls there, and where should repository be saved then: server, backend (in python)?

---

## Assistant

Short answer: I'd put the git calls in the Express server and keep the clone on that container's local disk, outside the `server/` folder. The Python backend only makes sense if you plan to move vocabulary logic there.

## What exists today

- **Commits go from the browser straight to GitHub.** `src/network/GitAPICalls.js:8-11` uses Octokit with `REACT_APP_GITHUB_TOKEN2`. Neither server is involved.
- **Express already handles the vocabulary repo:**
  - It knows the file locations (`VOCABULARY_SERVICE_URL`, `VOCABULARY_SERVICE_DISCUSSION_URL`).
  - It receives GitHub's push webhook (`POST /ocp/github-webhook`, `server/eventsCalls.js:100`).
  - It pushes `terms_changed` to browsers over SSE (`server/eventsCalls.js`).
- **The Python (FastAPI) backend only knows term UUIDs**, for votes, consensus and push notifications. Express forwards those calls to it (`server/databaseCalls.js:471-826`). It never sees term data or the TTL file.
- **Turtle is only parsed in JS**, with N3 in `src/network/parseRDFCalls.js`.
- **Deployment is one `node:20` container** (root `Dockerfile`), started with `nodemon`. There are no volumes and the server writes nothing to disk. The full `node:20` image already includes `git`.

## My recommendation: Express

- **The webhook is already there.** On `push`, besides sending `terms_changed`, it can run `git fetch`, so the clone stays current. If you go with Python, you'd have to forward the webhook or poll.
- **The term structure stays the same.** The server can parse TTL with the same N3 logic as `parseRDF`. With Python you'd write a second parser (rdflib), and its output, e.g. how altLabels get joined, could drift from the frontend's.
- **It fits how Express is already used.** It's the only server that knows the vocabulary repo, and the history endpoint is a read-only view built for the frontend.
- **Persistence isn't needed.** The clone and snapshots are a cache: commits never change, so a cached snapshot never goes stale. If the container restarts, it clones again on startup, which takes seconds for a small repo. You can add a Docker volume later if startup time ever matters.

**Python would be the better choice if:**
- you plan to move commits (writes) to the server and put them in Python, or
- you want snapshots in a database.

Right now the backend has no term data, so you'd be adding a whole new area of responsibility to it just for this feature.

## Where to put the clone (Express)

- **Location:** a path from an env var such as `VOCABULARY_REPO_DIR`, defaulting to e.g. `os.tmpdir()/vocabulary.git`.
- **Not inside `server/`:** `nodemon` watches that folder and would restart the server on every fetch.
- **Clone type:** a full `--bare` clone, so no working copy. Don't use a partial clone (`--filter=blob:none`): `git show` would then download objects over the network.
- **Snapshot cache:** an in-memory map from `sha` to the parsed term list, possibly limited in size. Entries never need invalidating. The only thing that changes is HEAD, after a fetch.

## Endpoint sketch

`GET /ocp/terms/:id/versions` would:
1. Run `git fetch` if the webhook marked the clone as outdated, or if the last fetch was more than about 30 s ago (a fallback in case a webhook is missed).
2. Run `git log --format=%H|%an|%aI|%s --grep=<uuid> -- <file.ttl>`.
3. Drop `Delete term` commits.
4. For each commit, run `git show <sha>:<file.ttl>`, parse it (or read it from the cache), and pick out the term.
5. Drop versions identical to the previous one, then return the response shape we agreed on (newest first).

Implementation: `child_process.execFile` (with fixed arguments, no shell) or `simple-git`. The frontend then swaps `mockTermVersions(term)` for a React Query request.

## Separate issue, not part of this task

`REACT_APP_GITHUB_TOKEN2` ends up in the JS bundle, so anyone can pull a token with write access to the repo out of the browser. Once Express has a clone and git access, moving writes there too would be the natural fix. I'd plan that as its own task.

## Questions before a detailed plan

1. **Ownership:** Do you own and deploy the FastAPI backend yourself, or is it another team's? That could tip the decision.
2. **Repo access:** Is the vocabulary repo public? If not, the server needs its own read token (`server/.env`), and it should be a different token from the one in the browser.
3. **Existing diff backend:** `ChangesTimeline` (`VocabularyMainTable.jsx:1074`) already calls `REACT_APP_DIFF_BACKEND_URL/api/ondet/sdiffs/commits?uri=<vocabulary file>`. That's the "ondet" service, which already lists commits for this file. Is it yours, and would extending it with per-term history be an option? I'd still prefer Express: ondet is built for comparing whole ontologies, not single terms.
4. **Older history:** Is history from the commit-message unification onwards enough for now (`--grep` on the UUID)? Or should older commits be included? That would require walking through every commit of the file.

---

## User

While I understand that I need to clone vocabulary git into frontend/vocabulary. I don't get how to use git as-is. Install npm library to frontend, create component similar to GitAPICalls, but with local git? And it's clear to me that I don't need backend for this task, I am not saving anything.

---

## Assistant

No npm package is needed, and none of this code goes in `src/`. Here's why, and what the plan looks like.

## Why the git code can't go in `src/`

The `frontend` folder holds two separate programs:

| | `src/` (React) | `server/` (Express) |
|---|---|---|
| Runs in | the user's browser | a Node process on the machine where the `frontend` folder lives |
| Can read `frontend/vocabulary`? | No. The browser only gets the built JS bundle and has no access to the server's disk. | Yes. It's the same machine and filesystem. |
| Can run `git`? | No. Browsers can't start processes. | Yes, via Node's built-in `child_process` |

So you're right that this doesn't need the Python backend, and nothing gets stored. It just runs in `server/` rather than `src/`. The browser asks Express for the versions, the same way it already asks for votes (`TermVoteCalls` → Express).

## How to run git "as is" from Node

Node can start the installed `git` program directly with the built-in `child_process.execFile`. Git is already installed in the `node:20` Docker image and on your machine (2.56). Roughly:

```js
const { execFile } = require('child_process');
const { promisify } = require('util');
const run = promisify(execFile);

const REPO_DIR = path.resolve(__dirname, '..', 'vocabulary'); // frontend/vocabulary
const git = async (...args) => (await run('git', ['--git-dir', REPO_DIR, ...args], { maxBuffer: 50 * 1024 * 1024 })).stdout;

// commits of one term
await git('log', branch, '--format=%H%x1f%an%x1f%aI%x1f%s', '--fixed-strings', `--grep=${termId}`, '--', filePath);
// the whole TTL file as it was at a commit
await git('show', `${sha}:${filePath}`);
```

`execFile` passes arguments without going through a shell, and `--fixed-strings` treats the term ID as plain text rather than a pattern. Together they make the user-supplied ID safe to use.

`simple-git` (in `server/package.json`) does the same with a nicer API, but it also just calls the `git` program. Not needed.

## Plan

**Server (`server/`)**
1. Add a new module, `server/vocabularyHistoryCalls.js`, in the same style as `eventsCalls.js`, and register it in `server/index.js`.
2. Clone setup when the server starts:
   - If `frontend/vocabulary` is missing, run `git clone --mirror <repo URL>`. Otherwise run `git fetch --prune`.
   - The repo URL, branch and file path come from `VOCABULARY_SERVICE_URL` through the existing `parseFileUrl` (`eventsCalls.js:13`).
   - Use `--mirror` rather than `--bare`, because `git fetch` doesn't update the branches of a plain bare clone.
3. Keeping it current:
   - The existing webhook handler (`eventsCalls.js:110`) marks the clone as outdated whenever it sends `terms_changed`.
   - Each request fetches if the clone is outdated or the last fetch was more than about 60 s ago.
   - All requests share a single running fetch.
4. Endpoint `GET /ocp/getTermVersions?termId=<uuid>`:
   - Check that `termId` looks like a UUID.
   - Run `git log --grep` and drop `Delete term` commits.
   - For each commit, run `git show`, parse the TTL with N3 and pick out the term.
   - Drop versions identical to the one before and return the agreed shape (newest first).
5. Copy the Turtle → term mapping from `src/network/parseRDFCalls.js` into the server and add `n3` to `server/package.json`. The server can't import from `src/`.
6. Keep an in-memory cache from `sha:termId` to the snapshot. It never needs clearing, because commits don't change.

**Frontend (`src/`)**
7. Add `src/network/TermVersionCalls.js` and `URL_GET_TERM_VERSIONS` in `src/constants/services.js`, following `TermVoteCalls`.
8. Add a `useTermVersions(termId)` React Query hook. It reloads when a `terms_changed` event arrives (`useLiveUpdates`) and after the user saves a term.
9. In `ExpandedRow`, replace `mockTermVersions(term)` with the hook. While loading or on error, show only the latest version and disable Compare. Keep `diffTermVersions`, the field list and the formatting helpers, and delete the mock generator.

**Repo setup**
10. Add `/vocabulary` to `.gitignore`, so the clone isn't picked up by the main repo.
11. Add `vocabulary` to `.dockerignore`, so your local clone isn't copied into the image (`COPY . /app`). The container clones its own copy at startup.
12. The `frontend/vocabulary` location is fine: nodemon only watches `server/`, and react-scripts only watches `src/`.

## Questions

1. **Public or private repo?** If the vocabulary repo is private, the clone needs a read token in `server/.env` (e.g. `VOCABULARY_REPO_TOKEN`).
2. **Who creates the clone?** Should the server clone automatically on startup (my suggestion), or should cloning be a manual setup step listed in AGENTS.md?
3. **`execFile` or `simple-git`?** I'd use plain `execFile`: no new dependency, and only two git commands.

---

## User

Write me a js component in server that does some simple git operation, maybe a clone that should run everytime, when service is deployed. I just need to understand how to use exec in node

---

## Assistant

I added `server/vocabularyRepository.js`, which clones the vocabulary repo when the server starts and updates the existing clone on every later start. I ran it once: it cloned `tib-ts/vocabulary_development_ver_1` into `frontend/vocabulary` in about 0.75 s (256 KB). A second run only fetched, in about 0.35 s. The repo is public, so no token is needed.

## How exec works in Node

`child_process` has two functions that matter here:

```js
exec('git clone ' + url)          // runs the whole string in a shell → outside input (term id, URL) can inject commands
execFile('git', ['clone', url])   // starts the git program directly, arguments as an array, no shell → safe
```

Both take a callback `(error, stdout, stderr)`. Wrapping them with `promisify()` turns them into a Promise of `{ stdout, stderr }`, so you can `await` them:

```js
const execFileAsync = promisify(execFile);
const { stdout } = await execFileAsync('git', ['log', '-1', '--format=%H'], { maxBuffer: 50 * 1024 * 1024 });
```

- **Errors:** if git exits with a non-zero code, the Promise rejects. `error.stderr` then holds git's own error message.
- **Output size:** `maxBuffer` caps how much output is accepted, 1 MB by default. A larger output also rejects the Promise. That would matter later for `git show` of the whole TTL file.

## What the module does

- **`runGit(args)`**: a small wrapper around `execFile('git', args)` that returns stdout with whitespace trimmed.
- **`runGitInRepository(args)`**: the same, but adds `--git-dir frontend/vocabulary`, so git always works on the clone no matter which folder the server was started from.
- **`syncRepository()`**:
  - Gets the repo, branch and file from `VOCABULARY_SERVICE_URL`, using the existing `parseFileUrl` from `eventsCalls.js`.
  - If there's no clone yet, runs `git clone --mirror`. Otherwise runs `git fetch --prune`.
  - As an example of reading git's output, it then logs the last commit that touched `terms.ttl` (hash, author, date, message). The fields are separated by the `%x1f` character, which never appears in commit messages, so splitting on it is safe.

## Other changes

- **`server/index.js`**: calls `syncRepository()` after `app.listen()`. It isn't awaited, so the server starts serving requests straight away, and a failure is only logged.
- **`.gitignore` and `.dockerignore`**: both now ignore `vocabulary/`. Your local clone won't be committed or copied into the Docker image; the container makes its own clone at startup.

The next step would be the history query itself, which follows the same pattern:

```js
await runGitInRepository(['log', branch, '--format=%H%x1f%an%x1f%aI%x1f%s', '--fixed-strings', `--grep=${termId}`, '--', filePath]);
```





