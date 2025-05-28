import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

dotenv.config();

const outputDir = process.env.UI_OUTPUT_DIR || 'codeceptjs-tests/output';
const prefix = 'allure-report-';

function getLatestReportDir() {
  const files = fs.readdirSync(outputDir)
    .filter(name => name.startsWith(prefix))
    .sort()
    .reverse();

  return files.length > 0 ? files[0] : null;
}

const latestReport = getLatestReportDir();

if (!latestReport) {
  console.log('❌ No historical reports found.');
  process.exit(1);
}

const reportPath = path.join(outputDir, latestReport);
console.log(`✅ Opening latest report: ${reportPath}`);

execSync(`npx allure open "${reportPath}"`, { stdio: 'inherit' });
