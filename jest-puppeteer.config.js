// jest-puppeteer.config.js
/**
 * headless: makes it run the tests without actually opening a
 * chrome browser window and showing the visual process.
 */
module.exports = {
  launch: {
    dumpio: true,
    headless: true,
  },
  browser: "chromium",
  browserContext: "default",
  server: {
    command: `npm start`,
    port: 3000,
    launchTimeout: 10000,
    debug: true,
  },
};

// {
//   "projectId": "ju1mx2"
// }

// cypress run --record --key b4550d25-59b6-40fc-930c-8ef6e51ab1d4
