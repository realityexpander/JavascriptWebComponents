## Web Components Playground

in `package.json`
```
"main": "dist/app.js", // non-js modules
"module": "dist/app.js", // uses es modules
"types": "dist/types.d.ts", // for typescript
"context": "browser", // generate es modules?
```

### `isConnected` Test
```
let test = document.createElement('p')
console.log(test.isConnected) // false
document.body.appendChild(test)
console.log(test.isConnected) // true
```

### Difference between shadow and light DOM

```
this.innerHTML // -> create element in regular DOM
this.shadowRoot.innerHTML // -> create content in shadow DOM
```

In a wc, it's possible to update each attribute only when its changed for more performance. Must manually do this or look into a differ, or just use a pre-made component for complex stuff like a spreadsheet.

### Dev

#### Start 2 terminals:
- start the server and shows tsc compiler errors
  - Term 1 -> `npm run start-dev-tsc-wds-1`

- starts the rollup build watcher
  - Term 2 -> `npm run start-dev-rollup-2`

#### Serve by ngrok:
Google Auth 
  - Requires OAuth Login
  - `npm run serve-ngrok-oauth`
    - `ngrok http http://localhost:8000 --oauth=google --oauth-allow-email=realityexpander@gmail.com`
  - note: can add up to 5 emails on free plan


Basic Auth
  - Simple Basic-Auth login
  - `npm run serve-ngrok-basicauth`
  - `ngrok http http://localhost:8000 --basic-auth user:password`

### Web Components Resources
  - SMART elements
    - https://www.htmlelements.com/demos/page-templates/admin-template/layouts
  - Simple Router
    - https://github.com/dedego/web-component-router#routemixin
  - HTML Elements Templates (admin)
    - https://www.htmlelements.com/templates/
  - SMART site templates
    - https://www.htmlelements.com/templates/
  - Modern Web - Using Web Components Guide
    - https://modern-web.dev/blog/introducing-modern-web/#modern-web-family
    - https://modern-web.dev/guides/going-buildless/getting-started/
    - https://modern-web.dev/docs/dev-server/overview/
    - github
      - https://github.com/modernweb-dev/example-projects/blob/master/lit-element-ts-esbuild/tsconfig.json
  - LIT Playground
    - https://lit.dev/playground/#sample=examples/full-component
    - Youtube: https://www.youtube.com/@buildWithLit/videos
    - Documentation: 
      - https://lit.dev/tutorials/intro-to-lit/
      - https://lit.dev/docs/components/properties/
      - https://lit.dev/docs/releases/upgrade/#update-packages-and-import-paths
      - https://lit.dev/docs/tools/production/
      - https://lit.dev/docs/v1/components/templates/
  - Material-components material-components-web (MDC)
    - https://github.com/material-components/material-components-web/blob/master/packages/mdc-top-app-bar/README.md
    - https://pub.dev/documentation/mdc_web/latest/mdc_web/MDCDrawer-class.html
  - Vite (more sophisticated rollup)
    - https://vitejs.dev/guide/why.html
  - Parcel
    - https://parceljs.org/features/targets/#package.json%23targets.*.source
  - ES6 Bare Module Imports
    - https://dplatz.de/blog/2019/es6-bare-imports.html
  - 10 Must know CSS tricks
    - https://medium.com/before-semicolon/10-css-tricks-you-need-to-know-about-part-2-df52ee0b2937
  - 25 JavaScript Tricks You Need To Know About (Part 1 & 2) 
    - Github: https://github.com/beforesemicolon/javascript-solutions.git
    - https://medium.com/before-semicolon/25-javascript-code-solutions-utility-tricks-you-need-to-know-about-3023f7ed993e
    - https://medium.com/before-semicolon/25-more-javascript-code-solutions-you-need-to-know-about-6ee344c2da58