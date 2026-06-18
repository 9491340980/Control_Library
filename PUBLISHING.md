# Publishing & using the library (GitHub Packages — free & private)

The library is published to **GitHub Packages** as `@9491340980/controls`.
It is private to the `9491340980` GitHub account; only authorized tokens can install it.

---

## One-time: create a token

GitHub → **Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token (classic)**.
Select scopes:
- `write:packages` (to publish)
- `read:packages` (to install)
- `repo` (needed because the repo is private)

Copy the token (looks like `ghp_…`). Treat it like a password.

---

## Publish a new version

1. Bump the version in `projects/controls/package.json` (SemVer: patch/minor/major).
2. Provide the token via an environment variable, then publish:

   **PowerShell:**
   ```powershell
   $env:NPM_TOKEN = "ghp_your_token_here"
   npm run publish:lib
   ```
   **Bash:**
   ```bash
   export NPM_TOKEN=ghp_your_token_here
   npm run publish:lib
   ```

`publish:lib` builds the library and runs `npm publish` from `dist/controls`.
The package appears under the repo's **Packages** section on GitHub.

> The committed `.npmrc` maps the `@9491340980` scope to GitHub Packages and reads
> the token from `NPM_TOKEN` — so the secret is never stored in the repo.

---

## Use it in another app (e.g. carehigh-ui)

### 1. Point the scope at GitHub Packages
Add a `.npmrc` in the app's root:
```
@9491340980:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```
Set `NPM_TOKEN` (a token with `read:packages`) in your environment before installing.

### 2. Install
```bash
npm install @9491340980/controls
```
Optional peer deps — only if you use the `ch-ng-*` wrappers:
```bash
npm install @angular/material @angular/cdk @ng-select/ng-select ngx-file-drop
```

### 3. Load the theme (once, in global styles)
```scss
@use '@9491340980/controls/styles/theme';
```

### 4. (Optional) Share the Tailwind preset
```js
// tailwind.config.js
module.exports = {
  presets: [require('@9491340980/controls/tailwind-preset')],
  content: ['./src/**/*.{html,ts}'],
};
```

### 5. Use a control
```ts
import { ChButton, ChInput } from '@9491340980/controls';

@Component({ imports: [ChButton, ChInput], /* … */ })
export class MyPage {}
```
```html
<ch-button variant="primary">Save</ch-button>
```

---

## CI publishing (optional, fully automated)
In GitHub Actions, `secrets.GITHUB_TOKEN` already has package write permission — set
`NPM_TOKEN: ${{ secrets.GITHUB_TOKEN }}` and run `npm run publish:lib` on a tag/release.

---

## Bonus: host the Storybook docs for free
```bash
npm run build-storybook        # outputs storybook-static/
```
Publish `storybook-static/` to **GitHub Pages** (free) so the team can browse the
component docs online.
