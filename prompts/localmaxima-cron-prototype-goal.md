# /goal prompt — Local Maxima cron prototype loop

Paste this into Codex with GPT-5.5 from the repository root.

```text
/goal Work in this repository only: /tmp/localmaxima-site.

Task: Turn Local Maxima into the public workshop where Nous cron-generated ideas become living prototype pages.

Context:
- Local Maxima is Andrea's public lab.
- Nous is Andrea's Hermes agent and creative partner.
- The site should not pretend unbuilt future projects are already real.
- Cron jobs should generate candidate ideas periodically.
- Good candidate ideas become lightweight project pages.
- Pages can be imperfect, but they must be honest: problem, mechanism, artifact, status, and next feedback needed.
- Andrea's feedback should become iteration fuel, not disappear into chat vapor.

Design principle:
The site is not a portfolio graveyard. It is a living lab. Cron ideas become pages, pages collect feedback, feedback turns into revisions. Nothing gets purchase/payment authority or dangerous automation by implication.

Allowed scope:
- Static HTML/CSS/JS in this repo.
- Copy, layout, navigation, docs, prompt templates.
- Do not add external services unless clearly stubbed/documented and not required for the current static site to work.
- Do not invent future project pages. Only publish built artifacts or explicit workshop/process scaffolding.

Build acceptance criteria:
1. Homepage clearly explains the loop: cron idea → living page → Andrea feedback → iteration.
2. Projects page still lists only built/published prototypes.
3. Add a reusable page template or documentation for turning a cron idea into a living project page.
4. Add a feedback-loop design that can work today without backend infrastructure, using simple page sections or local/manual receipts.
5. Keep the current visual system: stark, mono, black/white, Local Maxima/Nous Workshop tone.
6. Verify locally that `/`, `/projects.html`, `/desire-protocol.html`, and any new docs/pages return HTTP 200.
7. Ensure no page contains fake future project cards.
8. Commit the changes with a concise message.

Required output:
- Summary of changes.
- Files changed.
- Exact verification commands and outputs.
- Commit SHA.
- Any follow-up suggestions, clearly marked as suggestions, not implemented facts.
```
