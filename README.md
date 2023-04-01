README.md

in package.json
"main": "dist/app.js", // non-js modules
"module": "dist/app.js", // uses es modules
"types": "dist/types.d.ts", // for typescript
"context": "browser", // generate es modules?

// isConnected test
let test = document.createElement('p')
console.log(test.isConnected) // false
document.body.appendChild(test)
console.log(test.isConnected) // true

this.innerHTML -> create element in regular DOM
this.shadowRoot.innerHTML -> create content in shadow DOM

// Possible to update each attribute only when its changed for more performance


Dev:
Start 2 terminals:
- start the server and shows tsc compiler errors
  - Term 1 -> `npm run start-dev-tsc-wds-1`

- starts the rollup build watcher
  - Term 2 -> `npm run start-dev-rollup-2`

Serve by ngrok:
Google Auth 
  - `npm run serve-ngrok-oauth`
    - `ngrok http http://localhost:8000 --oauth=google --oauth-allow-email=realityexpander@gmail.com`
  - note: can add up to 5 emails on free plan
Basic Auth
  - `npm run serve-ngrok-basicauth`
  - `ngrok http http://localhost:8000 --basic-auth user:password`

