// npx tsx src/features/generate-csv-sifarnici.file.ts

import * as fs from 'fs';

import { data } from '../utils/loaded-data';

const headers = data[0];

let csvContent = '';
for (let i = 1; i < data.length; i++) {
  const row = data[i];
  const csvRow = [
    row[headers.indexOf('budget_user_id')],
    row[headers.indexOf('recipient')],
    row[headers.indexOf('recipient_place')],
    row[headers.indexOf('address')],
    '', // empty field
    row[headers.indexOf('JMBG')],
    '0', // default value
    '0', // default value
    row[headers.indexOf('account_number')],
    row[headers.indexOf('banka')],
    ''
  ].join('$');
  
  csvContent += csvRow + '\n';
}


// fs.writeFileSync('Sifarnici.csv', csvContent, 'utf8');
fs.writeFileSync('./zaSpiri/Sifarnici.csv', csvContent, 'utf8');
console.log(' generated: Sifarnici.csv from Placanje.xlsx');