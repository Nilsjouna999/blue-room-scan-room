# BLUE ROOM — Revert Playbook

How to undo changes and **identify what to undo**. Read this when the user says
"revert", "roll back", "undo that", or "go back to before X". Git is the copy-safe —
there are no backup copies of files (those rot); every commit and tag is a restore
point. Last updated: 2026-06-14.

---

## 1. The three kinds of restore point

1. **Named baseline tags** — stamped before a big visual leap.
   - `baseline-v1` → commit `9a5ffb0` = the state *before* the shiny-technique
     experiments (corner-shape, scroll-driven dossier reveal, @property stat fill,
     SVG line-draw, pointer spotlight).
   - List them: `git tag -n`  ·  inspect one: `git show baseline-v1`.
2. **Per-task commits** — every task is exactly one commit (one-job-per-session law,
   FILE_MAP). The human index of "what each commit did + which files" lives in
   **`docs/CHANGE_MAP.md`** (dated entry per task) and **`docs/TASK_QUEUE.md`**
   (Active list). Each task's report also prints its `git revert <hash>` line.
3. **The working tree** — uncommitted experiments. `git stash` to shelve,
   `git checkout -- <file>` to discard a file's uncommitted edits.

## 2. How to SPOT what to revert (symptom → target → command)

| The user says… | How to find the target | Command |
| --- | --- | --- |
| "revert the last change" | `git log --oneline -5` → top hash | `git revert <hash>` |
| "revert <feature name>" (e.g. "the archetype note", "the Lab materials") | Search `docs/CHANGE_MAP.md` / `docs/TASK_QUEUE.md` for the feature — the entry names the session + you match it to `git log --oneline` | `git revert <hash>` |
| "put the card back the way it was" / "restore the original design" | Restore specific files from the baseline tag (non-destructive — leaves history intact) | `git checkout baseline-v1 -- styles.css app.js data.js` then commit |
| "undo everything since the baseline" | Range-revert every commit after the tag | `git revert --no-edit baseline-v1..HEAD` |
| "what even changed in that commit?" | Inspect before deciding | `git show <hash>` · `git diff baseline-v1 -- <file>` |
| "scrap this, it's not committed yet" | Uncommitted edits only | `git restore <file>` (or `git stash`) |

If you cannot identify the exact target with confidence, **stop and show the user**
`git log --oneline -10` + the matching CHANGE_MAP entries, and ask which one — do
not guess-revert.

## 3. Which command to use (and what's safe)

- **`git revert <hash>`** — PREFERRED on `main`. Creates a new commit that undoes an
  old one; history is preserved, nothing is destroyed, and it's itself revertible.
  Safe to do without asking when the user clearly named the target.
- **`git checkout <tag> -- <files>`** — restore specific files to a known-good point
  without touching history. Then commit. Good for "make the card look like baseline
  again" while keeping later unrelated work.
- **`git reset --hard`** — DESTRUCTIVE. Only on a throwaway/experiment branch, never
  on shared `main` without explicit confirmation. Avoid by default.

## 4. Before a "huge new idea" — the pre-change ritual

1. **Tag a baseline:** `git tag -a baseline-vN <current-hash> -m "before <idea>"` then
   `git push origin baseline-vN`. (Increment N each big leap.)
2. **Or branch it:** `git switch -c experiment/<name>`; if the idea misses,
   `git switch main` and delete the branch — `main` was never touched. Merge/
   cherry-pick only winners.
3. **Prefer additive-behind-Lab:** add new ideas as *new* selectors / keys (e.g. the
   `data-lab-material` overlay), never overwriting shipped styles. Then revert = delete
   the added block; the shipped design is untouched by construction, and free/shiny
   stay byte-identical.
4. **One idea = one commit.** Batching several experiments into one commit makes a
   clean per-idea revert impossible — keep them separate so any single one can be
   pulled out.

## 5. After a revert

- Re-run the verification routes (sample room + the 4 `?dev` routes + bare menu;
  console clean) to confirm the revert didn't strand anything.
- Note the revert in `docs/CHANGE_MAP.md` so history stays legible.

---

**One line to remember:** *the index of what-changed is `CHANGE_MAP.md` +
`git log`; the restore points are the `baseline-*` tags and per-task commits;
the safe undo is `git revert <hash>` (or `git checkout baseline-vN -- <file>`).*
