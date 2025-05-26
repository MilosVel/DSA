// npx tsx index.ts

import * as fs from 'fs';
import XLSX from 'xlsx';
import { create } from 'xmlbuilder2';

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

// Constants for static values that are the same for all records
const BUDGET_YEAR = '2025';
const CUMULATIVE_REASON_CODE = 'PO07';
const CURRENCY_CODE = 'RSD';
const TREASURY = '029';

// Get headers from first row
const headers = data[0];

// Create XML root
const root = create({ version: '1.0', encoding: 'utf-8' })
  .ele('commitments', {
    budget_year: BUDGET_YEAR,
    cumulative_reason_code: CUMULATIVE_REASON_CODE,
    budget_user_id: '04646',
    currency_code: CURRENCY_CODE,
    treasury: TREASURY
  });

// Process each row (skip header row)
for (let i = 1; i < data.length; i++) {
  const row = data[i];
  
  // Create commitment element
  const commitment = root.ele('commitment', {
    reason_code: row[headers.indexOf('reason_code')] || 'PO01', // default value is PO01
    external_id: row[headers.indexOf('external_id')] ,
    recipient_place: row[headers.indexOf('recipient_place')] ,
    recipient: row[headers.indexOf('recipient')],
    account_number: row[headers.indexOf('account_number')],
    invoice_number: row[headers.indexOf('invoice_number')],
    invoice_type: row[headers.indexOf('invoice_type')] || '3', // default value is 3
    invoice_date: row[headers.indexOf('invoice_date')],
    due_date: row[headers.indexOf('due_date')],
    contract_number: row[headers.indexOf('contract_number')] || '', // default value is empty string
    payment_code: row[headers.indexOf('payment_code')],
    credit_model: row[headers.indexOf('credit_model')] || '', // default value is empty string
    credit_reference_number: row[headers.indexOf('credit_reference_number')],
    payment_basis: row[headers.indexOf('payment_basis')]
  });

  // Create item element
  const item = commitment.ele('item');
  item.ele('budget_user_id').txt(row[headers.indexOf('budget_user_id')] );
  item.ele('function_code').txt(row[headers.indexOf('function_code')]);
  item.ele('program_code').txt(row[headers.indexOf('program_code')]);
  item.ele('project_code').txt(row[headers.indexOf('project_code')]);
  item.ele('source_of_funding_code').txt(row[headers.indexOf('source_of_funding_code')]);
  item.ele('economic_classification_code').txt(row[headers.indexOf('economic_classification_code')]);
  item.ele('sub_economic_classification_code').txt(row[headers.indexOf('sub_economic_classification_code')]);
  item.ele('amount').txt(row[headers.indexOf('amount')]?.toString());
  item.ele('expected_payment_date').txt(row[headers.indexOf('expected_payment_date')]);
  item.ele('urgent_payment').txt(row[headers.indexOf('urgent_payment')]);
  item.ele('posting_account').txt(row[headers.indexOf('posting_account')]);
}

const xmlString = root.end({ prettyPrint: true });
fs.writeFileSync('Placanje.xml', xmlString, 'utf8');
console.log('XML file generated: output.xml');