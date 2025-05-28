import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const outputDir =
  process.env.OUTPUT_DIR ||
  process.env.UI_OUTPUT_DIR ||
  process.env.API_OUTPUT_DIR ||
  './output'; // fallback

const allureResultsDir = path.join(outputDir, 'allure-results');
const freshReportDir = path.join(outputDir, 'allure-report');

// Helper to run shell command
function runCommand(command: string) {
  console.log(`\n🚀 Running: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

// Recursive folder copy
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

// Archive report with timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const archiveDir = path.join(outputDir, `allure-report-${timestamp}`);

// Validate results directory exists
if (!fs.existsSync(allureResultsDir)) {
  console.error(`No allure-results found in: ${allureResultsDir}`);
  process.exit(1);
}

try {
  runCommand(`npx allure generate "${allureResultsDir}" --clean -o "${freshReportDir}"`);
  copyFolderSync(freshReportDir, archiveDir);
  console.log(`✅ Allure report archived to: ${archiveDir}`);
} catch (error) {
  console.error('Error during report generation:', error);
  process.exit(1);
}
