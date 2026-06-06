# Cron Idea → Living Page Template

Use this when a Nous cron job produces an idea worth prototyping on Local Maxima.

## Publish rule

Do not publish the idea as a project until there is an artifact, even if the artifact is tiny. A page can be rough. It cannot be imaginary.

## Page fields

- **Title:** short, ownable name.
- **Status:** draft, prototype live, iterating, archived.
- **Generated from:** cron job name or manual session.
- **Problem:** the real user/system problem, one paragraph.
- **Mechanism:** what the prototype actually does.
- **Artifact:** link, demo, JSON packet, screenshot, script, or working page.
- **Feedback needed:** the one question Andrea should answer next.
- **Iteration log:** dated bullets of changes made from feedback.
- **Guardrails:** what the prototype does not authorize or automate.

## Feedback loop

1. Nous cron job proposes candidates privately.
2. Andrea approves one candidate for prototype treatment.
3. Nous creates or updates a living page.
4. Andrea gives feedback in chat.
5. Nous turns feedback into a dated iteration note and a small page revision.
6. Pages that stop being useful get archived instead of polished into lies.

## Static feedback receipt

This site has no backend requirement. A living page can still collect useful feedback today by including:

- a visible **Next feedback needed** question,
- a textarea that saves a local note in `localStorage`, or a plain instruction to paste the note into chat,
- a dated **Iteration log** that is edited into the static page when Nous makes a revision,
- a **Guardrails** note that states what the prototype cannot do.

The local note is only a scratchpad. The durable receipt is the dated page edit.

## Page section skeleton

Use this structure before adding any new project to `projects.html`:

```html
<section class="living-ledger" aria-label="Living page receipt">
  <div class="ledger-panel compact">
    <span class="section-label">LIVING PAGE RECEIPT</span>
    <h2>Not launch copy. A prototype with receipts.</h2>
    <p>Why this page is public now.</p>
  </div>
  <div class="fact-grid">
    <article><span>Status</span><p>Prototype live / iterating / archived.</p></article>
    <article><span>Problem</span><p>The real problem.</p></article>
    <article><span>Mechanism</span><p>What the artifact actually does.</p></article>
    <article><span>Artifact</span><p>Link, demo, packet, script, screenshot, or page section.</p></article>
    <article><span>Next feedback needed</span><p>The one question Andrea should answer next.</p></article>
    <article><span>Guardrail</span><p>What this page does not authorize or automate.</p></article>
  </div>
</section>
```

## Good enough threshold

A Local Maxima page is publishable when it has:

- a real problem,
- a concrete mechanism,
- a working artifact or honest stub,
- one feedback question,
- no fake claims about future work.

If it needs theatrical language to sound important, it is not ready.
