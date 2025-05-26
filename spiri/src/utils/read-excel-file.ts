import XLSX from 'xlsx';
import { ExcelRow } from './types';

export const readExcelFile = (filePath: string): ExcelRow[] => {
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // This will use the first row as keys and return an array of objects
        const data = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, { defval: '' });
        return data;
    } catch (error) {
        console.error('Error reading Excel file:', error);
        throw error;
    }
};