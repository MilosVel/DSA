// import { readExcelFile } from './read-excel-file';

// const filePath = './input/Placanje.xlsx';

// export const data = readExcelFile(filePath    );




///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////   Ispod je kada ima vise excel fajlova u input folderu
///////////////////////////////////////



import { readExcelFile } from './read-excel-file';

// Read all Excel files from the input folder
export const data = readExcelFile('./input');
