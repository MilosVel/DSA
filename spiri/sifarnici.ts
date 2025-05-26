// npx tsx sifarnici.ts

import * as fs from 'fs';
import XLSX from 'xlsx';

console.log('Placanje...');

// Path to the Excel file
const filePath = './placanje/Placanje.xlsx';

// Read the Excel workbook
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert sheet to JSON array using first row as headers
const data: any[] = XLSX.utils.sheet_to_json(worksheet, { 
  defval: '',
  header: 1  // Use first row as headers
});


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


fs.writeFileSync('Sifarnici.csv', csvContent, 'utf8');
console.log(' generated: Sifarnici.csv from Placanje.xlsx');