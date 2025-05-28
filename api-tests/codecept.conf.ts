require('ts-node').register();
import { setHeadlessWhen } from '@codeceptjs/configure';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

setHeadlessWhen(process.env.HEADLESS);

const outputDir = process.env.OUTPUT_DIR
  ? path.resolve(process.env.OUTPUT_DIR)
  : path.resolve(__dirname, 'output');

export const config: CodeceptJS.MainConfig = {
  tests: './features/**/*.feature',
  output: './output',
  helpers: {
    REST: {
      endpoint: 'https://reqres.in/api',
      defaultHeaders: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY
      }
    }
  },
  gherkin: {
    features: './features/**/*.feature',
    steps: ['./steps/api.steps.ts']
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
  name: 'api-tests',
};
