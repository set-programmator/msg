import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const outputDir = process.env.OUTPUT_DIR || process.env.UI_OUTPUT_DIR || './codeceptjs-tests/output';

const allureResultsDir = path.join(outputDir, 'allure-results');
const freshReportDir = path.join(outputDir, 'allure-report');

function runCommand(command: string) {
  console.log(`\nRunning: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

function copyFolderSync(src: string, dest: string) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const archiveDir = path.join(outputDir, `allure-report-${timestamp}`);

try {
  // Generate fresh report
  runCommand(`npx allure generate ${allureResultsDir} --clean -o ${freshReportDir}`);

  // Archive the report
  copyFolderSync(freshReportDir, archiveDir);
  console.log(`\nAllure report archived to: ${archiveDir}`);

} catch (error) {
  console.error('Error during test run or report generation:', error);
  process.exit(1);
}
