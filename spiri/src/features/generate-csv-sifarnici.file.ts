// npx tsx src/features/generate-csv-sifarnici.file.ts

import * as fs from 'fs';
import { data } from '../utils/loaded-data';

let csvContent = '';
for (const row of data) {
  const csvRow = [
    row.budget_user_id,
    row.recipient,
    row.recipient_place,
    row.address,
    '', // empty field
    row.JMBG,
    '0', // default value
    '0', // default value
    row.account_number,
    row.banka,
    ''
  ].join('$');
  
  csvContent += csvRow + '\n';
}

try {
  fs.writeFileSync('./zaSpiri/Sifarnici.csv', csvContent, 'utf8');
  console.log('CSV file generated: zaSpiri/Sifarnici.csv');
} catch (error) {
  console.error('Error writing CSV file:', error);
  throw error;
}
