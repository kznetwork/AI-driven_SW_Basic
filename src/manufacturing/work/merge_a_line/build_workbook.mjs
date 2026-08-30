import fs from "node:fs/promises";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";

const base = "C:/DEV/manufacturing";
const work = `${base}/work/merge_a_line`;
const outputPath = `${base}/A_Line_통합_검사기록.xlsx`;
const payload = JSON.parse(await fs.readFile(`${work}/merged_data.json`, "utf8"));
const workbook = Workbook.create();
const dataSheet = workbook.worksheets.add("통합 데이터");
const summarySheet = workbook.worksheets.add("통합 요약");
const headers = payload.headers;
const totalRows = payload.rows.length;
const lastRow = totalRows + 1;

const rows = payload.rows.map((row) => row.map((value, index) => {
  if (index === 0 && value?.type === "date") {
    return new Date(`${value.value}T00:00:00`);
  }
  return value;
}));

dataSheet.showGridLines = false;
dataSheet.getRangeByIndexes(0, 0, 1, headers.length).values = [headers];
const chunkSize = 4000;
for (let start = 0; start < totalRows; start += chunkSize) {
  const chunk = rows.slice(start, Math.min(start + chunkSize, totalRows));
  dataSheet.getRangeByIndexes(start + 1, 0, chunk.length, headers.length).values = chunk;
}

dataSheet.getRange(`A1:U1`).format = {
  fill: "#1F4E78",
  font: { name: "Aptos", size: 10, bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: false,
  borders: { preset: "outside", style: "medium", color: "#17365D" },
};
dataSheet.getRange("A1:U1").format.rowHeight = 25;
dataSheet.getRange(`A2:A${lastRow}`).format.numberFormat = "yyyy-mm-dd";
dataSheet.getRange(`B2:B${lastRow}`).format.numberFormat = "hh:mm:ss";
dataSheet.getRange(`D2:D${lastRow}`).format.numberFormat = "0.0";
dataSheet.getRange(`M2:Q${lastRow}`).format.numberFormat = "0.0";
dataSheet.getRange(`R2:T${lastRow}`).format.numberFormat = "0";
dataSheet.getRange(`A2:U${lastRow}`).format.font = { name: "Aptos", size: 9 };
dataSheet.getRange(`A2:U${lastRow}`).format.verticalAlignment = "center";
dataSheet.getRange("A:A").format.columnWidth = 12;
dataSheet.getRange("B:B").format.columnWidth = 11;
dataSheet.getRange("C:E").format.columnWidth = 11;
dataSheet.getRange("F:F").format.columnWidth = 20;
dataSheet.getRange("G:G").format.columnWidth = 17;
dataSheet.getRange("H:H").format.columnWidth = 15;
dataSheet.getRange("I:K").format.columnWidth = 24;
dataSheet.getRange("L:L").format.columnWidth = 10;
dataSheet.getRange("M:T").format.columnWidth = 12;
dataSheet.getRange("U:U").format.columnWidth = 24;
dataSheet.freezePanes.freezeRows(1);
const dataTable = dataSheet.tables.add(`A1:U${lastRow}`, true, "MergedALineData");
dataTable.style = "TableStyleMedium2";
dataTable.showFilterButton = true;

summarySheet.showGridLines = false;
summarySheet.getRange("A1:J1").merge();
summarySheet.getRange("A1").values = [["A라인 기능검사 통합 요약"]];
summarySheet.getRange("A1:J1").format = {
  fill: "#17365D",
  font: { name: "Aptos Display", size: 18, bold: true, color: "#FFFFFF" },
  horizontalAlignment: "left",
  verticalAlignment: "center",
};
summarySheet.getRange("A1:J1").format.rowHeight = 32;
summarySheet.getRange("A2:J2").merge();
summarySheet.getRange("A2").values = [["2020-01-21 ~ 2020-01-25 · RC 시트 5개 통합"]];
summarySheet.getRange("A2:J2").format = {
  fill: "#D9EAF7",
  font: { name: "Aptos", size: 10, italic: true, color: "#44546A" },
};

summarySheet.getRange("A4:B8").values = [
  ["검증 항목", "값"],
  ["전체 데이터 건수", null],
  ["파일별 합계", null],
  ["차이", null],
  ["검증 결과", null],
];
summarySheet.getRange("B5").formulas = [[`=COUNTA('통합 데이터'!$U$2:$U$${lastRow})`]];
summarySheet.getRange("B6").formulas = [["=SUM(B12:B16)"]];
summarySheet.getRange("B7").formulas = [["=B5-B6"]];
summarySheet.getRange("B8").formulas = [["=IF(B7=0,\"일치\",\"확인 필요\")"]];

summarySheet.getRange("A11:B16").values = [
  ["원본 파일", "데이터 건수"],
  ...payload.fileCounts.map((item) => [item.file, null]),
];
for (let row = 12; row <= 16; row += 1) {
  summarySheet.getRange(`B${row}`).formulas = [[`=COUNTIF('통합 데이터'!$U$2:$U$${lastRow},A${row})`]];
}

const dateStart = 19;
const dateEnd = dateStart + payload.dateCounts.length;
summarySheet.getRange(`A${dateStart}:B${dateEnd}`).values = [
  ["검사 날짜", "데이터 건수"],
  ...payload.dateCounts.map(([date]) => [new Date(`${date}T00:00:00`), null]),
];
for (let row = dateStart + 1; row <= dateEnd; row += 1) {
  summarySheet.getRange(`B${row}`).formulas = [[`=COUNTIF('통합 데이터'!$A$2:$A$${lastRow},A${row})`]];
}

const resultStart = 27;
const resultEnd = resultStart + payload.resultCounts.length;
summarySheet.getRange(`A${resultStart}:B${resultEnd}`).values = [
  ["검사 결과", "데이터 건수"],
  ...payload.resultCounts.map(([result]) => [result, null]),
];
for (let row = resultStart + 1; row <= resultEnd; row += 1) {
  summarySheet.getRange(`B${row}`).formulas = [[`=COUNTIF('통합 데이터'!$C$2:$C$${lastRow},A${row})`]];
}

for (const headerRange of ["A4:B4", "A11:B11", `A${dateStart}:B${dateStart}`, `A${resultStart}:B${resultStart}`]) {
  summarySheet.getRange(headerRange).format = {
    fill: "#4472C4",
    font: { name: "Aptos", size: 10, bold: true, color: "#FFFFFF" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    borders: { preset: "outside", style: "medium", color: "#2F5597" },
  };
}
summarySheet.getRange("A5:A8").format = { fill: "#EAF2F8", font: { bold: true } };
summarySheet.getRange("B5:B8").format = { fill: "#FFFFFF", font: { bold: true, color: "#1F4E78" }, horizontalAlignment: "right" };
for (const bodyRange of ["A12:B16", `A${dateStart + 1}:B${dateEnd}`, `A${resultStart + 1}:B${resultEnd}`]) {
  summarySheet.getRange(bodyRange).format.borders = {
    insideHorizontal: { style: "thin", color: "#D9E2F3" },
    bottom: { style: "thin", color: "#A6A6A6" },
  };
}
summarySheet.getRange("B5:B7").format.numberFormat = "#,##0";
summarySheet.getRange("B12:B16").format.numberFormat = "#,##0";
summarySheet.getRange(`A${dateStart + 1}:A${dateEnd}`).format.numberFormat = "yyyy-mm-dd";
summarySheet.getRange(`B${dateStart + 1}:B${dateEnd}`).format.numberFormat = "#,##0";
summarySheet.getRange(`B${resultStart + 1}:B${resultEnd}`).format.numberFormat = "#,##0";
summarySheet.getRange("A:A").format.columnWidth = 26;
summarySheet.getRange("B:B").format.columnWidth = 15;
summarySheet.getRange("C:C").format.columnWidth = 3;
summarySheet.getRange("D:J").format.columnWidth = 12;
summarySheet.getRange("A4:B29").format.font = { name: "Aptos", size: 10 };
summarySheet.freezePanes.freezeRows(2);

const chart = summarySheet.charts.add("bar", summarySheet.getRange("A11:B16"));
chart.title = "원본 파일별 데이터 건수";
chart.hasLegend = false;
chart.xAxis = { axisType: "textAxis", textStyle: { fontSize: 9 } };
chart.yAxis = { numberFormatCode: "#,##0" };
chart.setPosition("D4", "J18");

const summaryInspect = await workbook.inspect({
  kind: "table",
  range: "통합 요약!A4:B29",
  include: "values,formulas",
  tableMaxRows: 30,
  tableMaxCols: 4,
  maxChars: 10000,
});
console.log("SUMMARY_INSPECT");
console.log(summaryInspect.ndjson);

const formulaErrors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log("FORMULA_ERRORS");
console.log(formulaErrors.ndjson);

const drawings = await workbook.inspect({ kind: "drawing", sheetId: "통합 요약", maxChars: 3000 });
console.log("DRAWINGS");
console.log(drawings.ndjson);

const previews = [
  ["통합 요약", "A1:J29", "summary_preview.png"],
  ["통합 데이터", "A1:U22", "data_preview_top.png"],
  ["통합 데이터", "A15014:U15028", "data_preview_23.png"],
];
for (const [sheetName, range, fileName] of previews) {
  const preview = await workbook.render({ sheetName, range, scale: 1, format: "png" });
  await fs.writeFile(`${work}/${fileName}`, new Uint8Array(await preview.arrayBuffer()));
}

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);
console.log(JSON.stringify({ outputPath, totalRows, lastRow }));
