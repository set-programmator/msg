import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import * as dotenv from 'dotenv';

dotenv.config();

const outputDir = process.env.OUTPUT_DIR || process.env.UI_OUTPUT_DIR || './codeceptjs-tests/output';
const reportsDir = path.join(outputDir);
const prefix = 'allure-report-';

async function main() {
  const files = fs.readdirSync(reportsDir);
  const reports = files.filter(f => f.startsWith(prefix));

  if (reports.length === 0) {
    console.log('No historical reports found.');
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedReport',
      message: 'Select a report to open:',
      choices: reports,
    }
  ]);

  const selectedFolder = answers.selectedReport;
  console.log(`Opening report: ${selectedFolder}`);

  execSync(`npx allure open ${path.join(outputDir, selectedFolder)}`, { stdio: 'inherit' });
}

main();
