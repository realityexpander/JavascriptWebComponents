import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'a7bq2k',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})

// export default {
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// };
//x