import { setHeadlessWhen } from '@codeceptjs/configure';
import * as dotenv from 'dotenv';

dotenv.config();

setHeadlessWhen(process.env.HEADLESS);

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
  include: {
    I: './steps_file.ts'
  },
  gherkin: {
    features: './features/**/*.feature',
    steps: ['./steps/api.steps.ts']
  },
  name: 'api-tests',
  plugins: {
    allure: {}
  }
};
