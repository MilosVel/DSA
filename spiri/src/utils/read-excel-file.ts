// import XLSX from 'xlsx';
// import { ExcelRow } from './types';

// export const readExcelFile = (filePath: string): ExcelRow[] => {
//     try {
//         const workbook = XLSX.readFile(filePath);
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];

//         // This will use the first row as keys and return an array of objects
//         const data = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, { defval: '' });
//         return data;
//     } catch (error) {
//         console.error('Error reading Excel file:', error);
//         throw error;
//     }
// };



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////   Ispod je kada ima vise excel fajlova u input folderu
///////////////////////////////////////



import * as fs from 'fs';
import * as path from 'path';
import XLSX from 'xlsx';
import { ExcelRow } from './types';

export const readExcelFile = (inputFolder: string = './input'): ExcelRow[] => {
    try {
        // Get all files from the input folder
        const files = fs.readdirSync(inputFolder);
        const excelFiles = files.filter(file => 
            file.endsWith('.xlsx') || file.endsWith('.xls')
        );

        if (excelFiles.length === 0) {
            throw new Error(`No Excel files found in ${inputFolder}`);
        }

        console.log(`Found ${excelFiles.length} excel files`,);

        // Read all Excel files and combine their data
        const allData: ExcelRow[] = [];
        
        for (const file of excelFiles) {
            const filePath = path.join(inputFolder, file);
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, { defval: '' });
            allData.push(...data);
        }
        return allData;
    } catch (error) {
        console.error('Error reading Excel files:', error);
        throw error;
    }
};