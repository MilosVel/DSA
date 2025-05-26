// npx tsx src/features/generate-xml-payment-file.ts

import * as fs from 'fs';
import { create } from 'xmlbuilder2';
import { data } from '../utils/loaded-data';

const BUDGET_YEAR = '2025';
const CUMULATIVE_REASON_CODE = 'PO07';
const CURRENCY_CODE = 'RSD';
const TREASURY = '029';

// Create XML root
const root = create({ version: '1.0', encoding: 'utf-8' })
  .ele('commitments', {
    budget_year: BUDGET_YEAR,
    cumulative_reason_code: CUMULATIVE_REASON_CODE,
    budget_user_id: '04646',
    currency_code: CURRENCY_CODE,
    treasury: TREASURY
  });

// Process each row
for (const row of data) {
  // Create commitment element
  const commitment = root.ele('commitment', {
    reason_code: row.reason_code || 'PO01', // default value is PO01
    external_id: row.external_id,
    recipient_place: row.recipient_place,
    recipient: row.recipient,
    account_number: row.account_number,
    invoice_number: row.invoice_number,
    invoice_type: row.invoice_type || '3', // default value is 3
    invoice_date: row.invoice_date,
    due_date: row.due_date,
    contract_number: row.contract_number || '', // default value is empty string
    payment_code: row.payment_code,
    credit_model: row.credit_model || '', // default value is empty string
    credit_reference_number: row.credit_reference_number,
    payment_basis: row.payment_basis
  });

  // Create item element
  const item = commitment.ele('item');
  item.ele('budget_user_id').txt(row.budget_user_id);
  item.ele('function_code').txt(row.function_code);
  item.ele('program_code').txt(row.program_code);
  item.ele('project_code').txt(row.project_code);
  item.ele('source_of_funding_code').txt(row.source_of_funding_code);
  item.ele('economic_classification_code').txt(row.economic_classification_code);
  item.ele('sub_economic_classification_code').txt(row.sub_economic_classification_code);
  item.ele('amount').txt(row.amount);
  item.ele('expected_payment_date').txt(row.expected_payment_date);
  item.ele('urgent_payment').txt(row.urgent_payment);
  item.ele('posting_account').txt(row.posting_account);
}

try {
  const xmlString = root.end({ prettyPrint: true });
  fs.writeFileSync('./zaSpiri/Placanje.xml', xmlString, 'utf8');
  console.log('XML file generated: zaSpiri/Placanje.xml');
} catch (error) {
  console.error('Error writing XML file:', error);
  throw error;
}