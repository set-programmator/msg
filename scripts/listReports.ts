import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const outputDir = process.env.OUTPUT_DIR || process.env.UI_OUTPUT_DIR || './codeceptjs-tests/output';
const reportsDir = path.join(outputDir);
const prefix = 'allure-report-';

try {
  const files = fs.readdirSync(reportsDir);
  const reports = files.filter(f => f.startsWith(prefix));

  if (reports.length === 0) {
    console.log('No historical reports found.');
  } else {
    console.log('Available historical reports:');
    reports.forEach(r => console.log(`- ${r}`));
  }
} catch (err) {
  console.error('Error reading reports directory:', err);
}
