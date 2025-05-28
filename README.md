## MSG Automation Project
## Accomplishments
Successfully implemented UI automation using CodeceptJS with Playwright and integrated Allure reporting for detailed test results.

Designed API automation using CodeceptJS with BDD-style features, fully integrated with Allure reports following the same consistent directory and script patterns as UI tests.

Established a clear, maintainable, and flexible npm script setup enabling smooth execution of tests and report generation for both UI and API tests.

Enabled separate output directories for UI (./codeceptjs-tests/output) and API (./api-tests/output) test artifacts and reports.

Created reusable TypeScript scripts to generate, open, list, and interactively manage Allure reports for both UI and API automation.

Hardcoded environment variables via cross-env in npm scripts to avoid .env inconsistencies and ensure reliable report path resolution.

## Getting Started
Prerequisites
Node.js (v16 or higher recommended)

npm (comes with Node.js)

Allure Commandline installed globally or use npx for Allure commands

To install globally:
npm install -g allure-commandline --save-dev

Git (optional, for cloning the repository)

Installation
Clone the repository:

git clone https://github.com/set-programmator/msg.git
cd msg-automation-exercise
Install dependencies:
npm install

Running Tests & Reports
All scripts are configured with cross-env to specify output folders clearly for UI and API tests.

UI Automation
Run UI tests in headed mode (with browser visible):
npm run test:ui:headed

Run UI tests in headless mode:
npm run test:ui:headless

Run UI tests and generate + open Allure report:
Headed mode:
npm run test:ui:headed:all

Headless mode:
npm run test:ui:headless:all

Generate Allure report only (after test run):
npm run generate:ui-report

Open the latest UI Allure report:
npm run open:ui-report

API Automation
Run API tests in headless mode:
npm run test:api:headless

Run API tests and generate + open Allure report:
Headless mode:
npm run test:api:headless:all

Generate Allure report only (after API test run):
npm run generate:api-report

Open the latest API Allure report:
npm run open:api-report

Additional Scripts
List all saved UI reports:
npm run list-reports-ui

List all saved API reports:
npm run list-reports-api

Open interactive UI report selector:
npm run open-report-interactive-ui

Open interactive API report selector:
npm run open-report-interactive-api

## Project Structure
├── api-tests/
│   ├── features/            # BDD feature files for API
│   ├── steps/               # API test scripts
│   ├── output/              # API test outputs and reports
│   └── codecept.conf.ts     # API test config
│
├── codeceptjs-tests/
│   ├── features/            # BDD feature files for UI
│   ├── steps/               # UI test scripts
│   ├── output/              # UI test outputs and reports
│   └── codecept.conf.ts     # UI test config
│
├── scripts/                 # TS scripts for report generation & opening
│
├── package.json
├── tsconfig.json
└── README.md
Notes
The project uses hardcoded OUTPUT_DIR paths in npm scripts for consistency and to avoid .env conflicts.

Allure reports are generated inside the respective output folders.

The openLatestReport.ts script automatically picks the latest report folder by date/time prefix.

For smooth execution, ensure Allure CLI commands can be run via npx or installed globally.