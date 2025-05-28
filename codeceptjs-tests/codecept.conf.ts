require('ts-node').register();
import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();

const outputDir = path.resolve(__dirname, 'output');

export const config = {
  tests: './steps/**/*.ts',
  output: outputDir,

  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://www.saucedemo.com',
      show: true,
      windowSize: '1280x800',
      chromium: {
        launchOptions: {
          slowmo: 1000,
        }
      }
    }
  },

  gherkin: {
    features: './features/*.feature',
    steps: ['./steps/index.ts']
  },

  plugins: {
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy',
      outputDir: path.join(outputDir, 'allure-results'),
    },
  },

  reporters: [
    'dot',
    `json:${path.join(outputDir, 'report.json')}`,
    `html:${path.join(outputDir, 'report.html')}`,
    `junit:${path.join(outputDir, 'report.xml')}`,
  ],

  name: 'codecept-playwright-bdd',
};
