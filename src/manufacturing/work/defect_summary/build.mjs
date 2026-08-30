import fs from "node:fs/promises";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "C:/DEV/manufacturing/defect_prediction_data.csv";
const outputDir = "C:/DEV/manufacturing/outputs/01a00808-3b90-72a2-b277-2dd2cc24185b";
const outputPath = `${outputDir}/defect_prediction_summary.xlsx`;

const csvText = (await fs.readFile(inputPath, "utf8")).replace(/^\uFEFF/, "");
const workbook = await Workbook.fromCSV(csvText, { sheetName: "원본 데이터" });
const raw = workbook.worksheets.getItem("원본 데이터");
const summary = workbook.worksheets.add("불량 합산표");

raw.showGridLines = false;
raw.freezePanes.freezeRows(1);
raw.getRange("A1:J2001").format.font = { name: "Aptos", size: 10 };
raw.getRange("A1:J1").format = {
  fill: "#1F4E78",
  font: { name: "Aptos", size: 10, bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  borders: { preset: "outside", style: "medium", color: "#17365D" },
};
raw.getRange("A1:J2001").format.autofitColumns();
raw.getRange("A:A").format.columnWidth = 16;
raw.getRange("B:F").format.columnWidth = 12;
raw.getRange("G:J").format.columnWidth = 12;
raw.getRange("B2:F2001").format.numberFormat = "0.00";
raw.getRange("J2:J2001").format.numberFormat = "0";
raw.tables.add("A1:J2001", true, "DefectSourceTable");

summary.showGridLines = false;
summary.getRange("A1:L1").merge();
summary.getRange("A1").values = [["제조 불량 합산표"]];
summary.getRange("A1:L1").format = {
  fill: "#17365D",
  font: { name: "Aptos Display", size: 18, bold: true, color: "#FFFFFF" },
  horizontalAlignment: "left",
  verticalAlignment: "center",
};
summary.getRange("A1:L1").format.rowHeight = 32;
summary.getRange("A2:L2").merge();
summary.getRange("A2").values = [["defect_prediction_data.csv 기준 · 불량=1"]];
summary.getRange("A2:L2").format = {
  fill: "#D9EAF7",
  font: { name: "Aptos", size: 10, italic: true, color: "#44546A" },
  verticalAlignment: "center",
};
summary.getRange("A2:L2").format.rowHeight = 21;

summary.getRange("A4:B7").values = [
  ["핵심 지표", "값"],
  ["전체 생산 건수", null],
  ["불량 건수", null],
  ["불량률", null],
];
summary.getRange("B5").formulas = [["=COUNTA('원본 데이터'!$A$2:$A$2001)"]];
summary.getRange("B6").formulas = [["=COUNTIF('원본 데이터'!$J$2:$J$2001,1)"]];
summary.getRange("B7").formulas = [["=IF(B5=0,0,B6/B5)"]];

const blocks = [
  { range: "A10:D13", title: "원료등급별 불량", cats: ["A", "B", "C"], sourceCol: "G" },
  { range: "A16:D18", title: "교대조별 불량", cats: ["주간", "야간"], sourceCol: "H" },
  { range: "A21:D28", title: "요일별 불량", cats: ["월", "화", "수", "목", "금", "토", "일"], sourceCol: "I" },
];

for (const block of blocks) {
  const [start, end] = block.range.split(":");
  const startRow = Number(start.match(/\d+/)[0]);
  const endRow = Number(end.match(/\d+/)[0]);
  summary.getRange(`A${startRow}:D${endRow}`).values = [
    [block.title.replace("별 불량", ""), "생산 건수", "불량 건수", "불량률"],
    ...block.cats.map(c => [c, null, null, null]),
  ];
  for (let r = startRow + 1; r <= endRow; r++) {
    summary.getRange(`B${r}`).formulas = [[`=COUNTIF('원본 데이터'!$${block.sourceCol}$2:$${block.sourceCol}$2001,A${r})`]];
    summary.getRange(`C${r}`).formulas = [[`=SUMIF('원본 데이터'!$${block.sourceCol}$2:$${block.sourceCol}$2001,A${r},'원본 데이터'!$J$2:$J$2001)`]];
    summary.getRange(`D${r}`).formulas = [[`=IF(B${r}=0,0,C${r}/B${r})`]];
  }
  summary.getRange(`A${startRow}:D${startRow}`).format = {
    fill: "#4472C4",
    font: { bold: true, color: "#FFFFFF" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    borders: { preset: "outside", style: "medium", color: "#2F5597" },
  };
  summary.getRange(`A${startRow + 1}:D${endRow}`).format.borders = {
    insideHorizontal: { style: "thin", color: "#D9E2F3" },
    bottom: { style: "thin", color: "#A6A6A6" },
  };
  summary.getRange(`B${startRow + 1}:C${endRow}`).format.numberFormat = "#,##0";
  summary.getRange(`D${startRow + 1}:D${endRow}`).format.numberFormat = "0.0%";
}

summary.getRange("A4:B4").format = {
  fill: "#4472C4", font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center", borders: { preset: "outside", style: "medium", color: "#2F5597" },
};
summary.getRange("A5:A7").format = { fill: "#EAF2F8", font: { bold: true, color: "#1F1F1F" } };
summary.getRange("B5:B7").format = { fill: "#FFFFFF", font: { bold: true, size: 13, color: "#1F4E78" }, horizontalAlignment: "right" };
summary.getRange("A4:B7").format.borders = { preset: "outside", style: "medium", color: "#A6A6A6" };
summary.getRange("B5:B6").format.numberFormat = "#,##0";
summary.getRange("B7").format.numberFormat = "0.0%";

summary.getRange("A:A").format.columnWidth = 16;
summary.getRange("B:C").format.columnWidth = 13;
summary.getRange("D:D").format.columnWidth = 12;
summary.getRange("E:E").format.columnWidth = 3;
summary.getRange("F:L").format.columnWidth = 12;
summary.getRange("A4:D27").format.font = { name: "Aptos", size: 10 };
summary.getRange("A5:A27").format.horizontalAlignment = "left";
summary.getRange("B5:D27").format.horizontalAlignment = "right";
summary.freezePanes.freezeRows(2);

const chart1 = summary.charts.add("bar", summary.getRange("A10:C13"));
chart1.title = "원료등급별 생산·불량 건수";
chart1.hasLegend = true;
chart1.yAxis = { numberFormatCode: "#,##0" };
chart1.setPosition("F4", "L15");

const chart2 = summary.charts.add("bar", summary.getRange("A21:C28"));
chart2.title = "요일별 생산·불량 건수";
chart2.hasLegend = true;
chart2.yAxis = { numberFormatCode: "#,##0" };
chart2.setPosition("F16", "L29");

const summaryCheck = await workbook.inspect({
  kind: "table",
  range: "불량 합산표!A4:D28",
  include: "values,formulas",
  tableMaxRows: 30,
  tableMaxCols: 6,
  maxChars: 9000,
});
console.log("SUMMARY_CHECK");
console.log(summaryCheck.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log("ERROR_SCAN");
console.log(errors.ndjson);

await fs.mkdir(outputDir, { recursive: true });
for (const [sheetName, range, fileName] of [["원본 데이터", "A1:J40", "raw_preview.png"], ["불량 합산표", "A1:L29", "summary_preview.png"]]) {
  const preview = await workbook.render({ sheetName, range, scale: 1, format: "png" });
  await fs.writeFile(`${outputDir}/${fileName}`, new Uint8Array(await preview.arrayBuffer()));
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(`OUTPUT=${outputPath}`);
