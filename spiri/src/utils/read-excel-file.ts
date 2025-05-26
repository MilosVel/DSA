
import * as fs from 'fs';
import XLSX from 'xlsx';

const filePath = './input/Placanje.xlsx';
export const readExcelFile = (filePath: string) => {

    // Read the Excel workbook
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert sheet to JSON array using first row as headers
    const data: any[] = XLSX.utils.sheet_to_json(worksheet, { 
      defval: '',
      header: 1  // Use first row as headers
    });

    return data;
};

