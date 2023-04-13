## Web Components Playground

## Current dev setup
- terminal 1
  - `npm run start-dev-just-rollup`
- terminal 2
  - `npm run start-dev-tsc-wds-1`

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

  - Vaadin
    - https://studio.webcomponents.dev/edit/bCuQQiNnS6eeVejaBPar/www/index.html?p=website
  
  - 9 Web Components UI Libraries You Should Know in 2021
    - https://blog.bitsrc.io/9-web-component-ui-libraries-you-should-know-in-2019-9d4476c3f103
  - Dark Mode Toggle
    - https://github.com/GoogleChromeLabs/dark-mode-toggle/tree/main/demo

  - Awesome Standalones - A curated list of awesome framework-agnostic standalone web components
    - https://github.com/davatron5000/awesome-standalones

  - ++ Shoelace Components
    -  Great one-offs
    - https://shoelace.style/components/mutation-observer
    - QR Code - https://shoelace.style/components/qr-code
    - Image Comparer - https://shoelace.style/components/image-comparer
    - Color Picker - https://shoelace.style/components/color-picker
    - Skeletons - https://shoelace.style/components/skeleton
    - Dialogs - https://shoelace.style/components/dialog
    - Alerts - https://shoelace.style/components/alert
    - Pulsating Badges - https://shoelace.style/components/badge
    - Carousels - https://shoelace.style/components/carousel
    - Details - https://shoelace.style/components/details
    - Divider - https://shoelace.style/components/divider
    - Drawer - https://shoelace.style/components/drawer
    - Dropdown - https://shoelace.style/components/dropdown
    - Bootstrap Icon - https://shoelace.style/components/icon
    - Progress Bar - https://shoelace.style/components/progress-bar
    - Progress Ring - https://shoelace.style/components/progress-ring
    - Rating - https://shoelace.style/components/rating
    - Select (like menu) - https://shoelace.style/components/select
    - Progress Spinners - https://shoelace.style/components/spinner
    - Split Panels - https://shoelace.style/components/split-panel
    - Switch - https://shoelace.style/components/switch
    - Tab Group - https://shoelace.style/components/tab-group
    - Tags & Pills - https://shoelace.style/components/tag
    - ToolTip - https://shoelace.style/components/tooltip
    - Tree (collapsing outline) - https://shoelace.style/components/tree
    - Animated Image - https://shoelace.style/components/animated-image
    - Animation - https://shoelace.style/components/animation
    - Format Bytes - https://shoelace.style/components/format-bytes
    - Format Date - https://shoelace.style/components/format-date
    - Include External html - https://shoelace.style/components/include

  - HTML with Superpowers
    - https://htmlwithsuperpowers.netlify.app/using/systems.html

  - PatternFly Elements
    - Clipboard Copy - https://patternflyelements.org/components/clipboard-copy/
    - Code Blocks - https://patternflyelements.org/components/code-block/
    - Progress Steps - https://patternflyelements.org/components/progress-stepper/
    - 
### Material Design Development
  - https://m2.material.io/develop/web/supporting/ripple
  - https://m2.material.io/components/snackbars/web#installation

  - mdc.xxx source code
    - https://material-components.github.io/material-components-web-catalog/#/component/snackbar
    - https://github.com/material-components/material-components-web
    - https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/component.ts

### Testing
  - Testing Web Components with Cypress and TypeScript
    - https://www.thisdot.co/blog/testing-web-components-with-cypress-and-typescript
  - How to use Cypress to write E2E Tests over a Registration Page
    - https://www.youtube.com/watch?v=CotnbfksSig
  - Cypress Docs
    - https://docs.cypress.io/guides/references/legacy-configuration#cypressjson
    - https://github.com/cypress-io/cypress-component-testing-apps/tree/main/svelte-vite-ts
  - Dashboard
    - https://cloud.cypress.io/projects/e51h9h/runs/10/overview/bea4404c-42a4-4821-970e-f0916ed16bd2?roarHideRunsWithDiffGroupsAndTags=1

  -run local cypress test
    - `npx cypress run --record --key 3fb68fff-d21a-4abe-817a-ef31d8303087`
### Node Libraries
  - Async - Async is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript. 
    - https://github.com/caolan/async
    - https://www.npmjs.com/package/async
    - https://www.npmjs.com/package/async-es

  - Axios - A better fetch
    - https://www.npmjs.com/package/axios

### Animation
  - Animating Custom Charts 2021 - #FrameworkLess - 20 lines code - Native Web Components
    - https://www.youtube.com/watch?v=dhZEBVOjVRU
  - Custom Web Component Behaviours and Events
    - https://www.youtube.com/watch?v=Y3EH4tCS6ig
  - 