# ch-controls — Angular Control Library

A shared Angular **control library** that multiple applications can reuse.
This workspace contains two projects:

| Project | Type | Purpose |
|---------|------|---------|
| `projects/controls`   | **library**     | The reusable controls (the "factory"). This is what gets published. |
| `projects/playground` | **application** | A local demo app to develop & test controls without publishing. |

> Angular version: **20** (matches the consuming apps, e.g. carehigh-ui).

---

## The mental model

```
 DEVELOP (controls/) --> BUILD (ng-packagr) --> dist/controls
                                                     |
                            +------------------------+------------------------+
                            |                                                 |
                      TEST in playground/                          PUBLISH to a registry
                                                                              |
                                                            CONSUME from carehigh-ui, etc.
```

- A **library** does not run on its own — apps import it.
- `dist/controls` is the compiled, publishable npm package.
- `projects/controls/src/public-api.ts` is the library's **front door**: only what is
  exported there is visible to consuming apps.

---

## Day-to-day development flow

### 1. Develop a control
Add components under `projects/controls/src/lib/...` and export them in
`projects/controls/src/public-api.ts`.

### 2. Build the library (compile it)
```bash
npm run build:lib          # one-off build
npm run watch:lib          # rebuild automatically on every change (use while developing)
```
> The playground imports `controls` from `dist/controls` (see the `paths` mapping in
> `tsconfig.json`), so the library **must be built** before the app can see changes.

### 3. Test it live in the playground
```bash
npm start                  # serves the playground at http://localhost:4200
```
Recommended dev setup: run `npm run watch:lib` in one terminal and `npm start` in another.

---

## Publishing (when ready to share with other apps)

Pick a **private registry** (GitHub Packages, Azure Artifacts, or self-hosted Verdaccio),
then:

```bash
ng build controls                 # produces dist/controls
cd dist/controls
npm publish                       # publishes the version in its package.json
```

Bump the version in `projects/controls/package.json` following **SemVer**:
- PATCH (1.0.0 -> 1.0.1) — bug fix
- MINOR (1.0.0 -> 1.1.0) — new feature, backward compatible
- MAJOR (1.0.0 -> 2.0.0) — breaking change

---

## Consuming from another app (e.g. carehigh-ui)

```bash
npm install @yourcompany/controls
```
```ts
import { ChButton } from '@yourcompany/controls';

@Component({ imports: [ChButton], /* ... */ })
export class SomePage {}
```
```html
<ch-button variant="primary" (clicked)="save()">Save</ch-button>
```

> The library's Angular major version must match the app's (both on Angular 20 here).

---

## Current controls

### `<ch-button>`
| Input/Output | Type | Default | Description |
|--------------|------|---------|-------------|
| `variant`  | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Visual style |
| `size`     | `'sm' \| 'md' \| 'lg'`                 | `'md'`      | Size |
| `disabled` | `boolean`                              | `false`     | Disabled state |
| `(clicked)`| `MouseEvent`                           | —           | Emitted on click |
