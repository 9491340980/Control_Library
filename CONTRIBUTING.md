# How to build a new control (the recipe)

Every control follows the **same shape** so the library stays consistent and any
developer can add one without thinking about structure. Copy an existing control
(e.g. `button`) and adapt it.

## 1. Folder layout

```
projects/controls/src/lib/<control-name>/
├── <control-name>.ts            # the component
├── <control-name>.scss          # styles (use design tokens, never hard-coded values)
├── <control-name>.stories.ts    # Storybook: live sample + API table + usage docs
└── <control-name>.spec.ts       # unit test
```

## 2. Component rules

- **Standalone** component (no NgModule).
- Selector is prefixed with **`ch-`** (e.g. `ch-input`, `ch-checkbox`).
- Use **signal inputs/outputs**: `input()`, `input.required()`, `output()`.
- Use `ChangeDetectionStrategy.OnPush`.
- Use `styleUrl: './<name>.scss'`.
- Document each input/output with a `/** ... */` comment — Storybook reads these.

Skeleton:

```ts
import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ch-thing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`,
  styleUrl: './thing.scss',
})
export class ChThing {
  /** What this input does. */
  readonly value = input<string>('');
  /** Emitted when ... */
  readonly changed = output<string>();
}
```

## 3. Styling rules

- **Only use design tokens** from `src/lib/styles/_tokens.scss`
  (e.g. `var(--ch-color-primary)`, `var(--ch-space-2)`).
- Never hard-code colors/spacing — that's how the whole library stays themeable.
- Need a new token? Add it to `_tokens.scss` first, then use it.

## 4. Export it (the front door)

Add the control to `projects/controls/src/public-api.ts`:

```ts
export * from './lib/thing/thing';
```

If it isn't exported here, apps cannot import it.

## 5. Document it with a story

Create `<control-name>.stories.ts` (copy `button.stories.ts`). Include:
- `tags: ['autodocs']` — auto-generates the props/API table.
- `argTypes` with `control:` and `description:` for each input — gives the live
  interactive controls panel.
- A doc comment on `meta` with a **usage code snippet**.
- A few named stories (`Primary`, `Disabled`, etc.) for the samples.

## 6. Verify

```bash
npm run build:lib     # library still compiles
npm run storybook     # see the control's page, sample, API table, and usage
```

---

## Suggested control roadmap (build in this order)

Form controls first (most reused), then layout/feedback:

1. Button ✅
2. Input / Text field
3. Select / Dropdown
4. Checkbox
5. Radio group
6. Textarea
7. Date picker
8. Card
9. Modal / Dialog
10. Toast / Notification
11. Tabs
12. Table / Data grid
```
