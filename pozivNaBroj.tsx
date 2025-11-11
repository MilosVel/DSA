// //   npx tsx pozivNaBroj.tsx
export const  slicePozivNaBroj = (start:number, end:number) => (pozivNaBroj: string) => pozivNaBroj.slice(start, end);

export const procesuiranjePozivaNaBroj = (pozivNaBroj: string) => ({
  ceoPozivNaBroj:slicePozivNaBroj(2,23)(pozivNaBroj),
  jbkjs: slicePozivNaBroj(2, 7)(pozivNaBroj),
  program: slicePozivNaBroj(7, 11)(pozivNaBroj),
  aktivnost: slicePozivNaBroj(11, 15)(pozivNaBroj),
  konto: slicePozivNaBroj(15, 21)(pozivNaBroj),
  izvorFinansiranja: slicePozivNaBroj(21, 23)(pozivNaBroj),
});

console.log(procesuiranjePozivaNaBroj('71046460602000142141101'));
