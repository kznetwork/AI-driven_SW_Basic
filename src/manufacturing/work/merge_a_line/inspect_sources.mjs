import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const base = "C:/DEV/manufacturing";
const files = [
  "2020-01-21_A_Line.xlsx",
  "2020-01-22_A_Line.xlsx",
  "2020-01-23_A_Line.xlsx",
  "2020-01-24_A_Line.xlsx",
  "2020-01-25_A_Line.xlsx",
];

for (const file of files) {
  const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(`${base}/${file}`));
  const sheet = workbook.worksheets.getItem("RC");
  const used = sheet.getUsedRange(true);
  console.log(JSON.stringify({ file, address: used.address, rows: used.rowCount, cols: used.columnCount, headers: sheet.getRangeByIndexes(0, 0, 1, used.columnCount).values[0] }));
  if (file === files[0] || file === files[2]) {
    const preview = await workbook.render({ sheetName: "RC", range: `A1:${file === files[0] ? "T12" : "R12"}`, scale: 1, format: "png" });
    await fs.writeFile(`${base}/work/merge_a_line/${file.slice(0, 10)}.png`, new Uint8Array(await preview.arrayBuffer()));
  }
}
