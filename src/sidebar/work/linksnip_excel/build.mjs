import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "C:/DEV/sidebar/outputs/linksnip_clicks_example";
const previewPath = "C:/DEV/sidebar/work/linksnip_excel/preview.png";
const outputPath = `${outputDir}/LinkSnip_링크별_클릭수_예시.xlsx`;

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("LinkSnip 클릭 현황");
sheet.showGridLines = false;

sheet.getRange("A1:H1").merge();
sheet.getRange("A1").values = [["LinkSnip 링크별 클릭 현황"]];
sheet.getRange("A1:H1").format = {
  fill: "#0F766E",
  font: { bold: true, color: "#FFFFFF", size: 18 },
  verticalAlignment: "center",
};
sheet.getRange("A1:H1").format.rowHeight = 34;

sheet.getRange("A2:C2").merge();
sheet.getRange("A2").values = [["예시 데이터 · 링크 성과를 클릭 수 기준으로 비교"]];
sheet.getRange("A2:C2").format = {
  font: { color: "#475569", italic: true, size: 10 },
};

const rows = [
  ["가격 안내", "https://example.com/pricing", 3526],
  ["무료 체험 신청", "https://example.com/free-trial", 3160],
  ["뉴스레터 구독", "https://example.com/newsletter", 2688],
  ["신제품 소개", "https://example.com/new-product", 2315],
  ["문의하기", "https://example.com/contact", 2210],
  ["웨비나 등록", "https://example.com/webinar", 1954],
  ["여름 프로모션", "https://example.com/summer-sale", 1842],
  ["기능 업데이트", "https://example.com/product-update", 1438],
  ["고객 성공 사례", "https://example.com/customer-story", 1275],
  ["파트너 프로그램", "https://example.com/partners", 986],
];

sheet.getRange("A4:C14").values = [["링크 이름", "원본 URL", "클릭 수"], ...rows];
const table = sheet.tables.add("A4:C14", true, "LinkSnipClicksTable");
table.style = "TableStyleMedium4";
table.showBandedRows = true;

sheet.getRange("A4:C4").format = {
  fill: "#0F766E",
  font: { bold: true, color: "#FFFFFF" },
  verticalAlignment: "center",
};
sheet.getRange("C5:C14").format.numberFormat = "#,##0";
sheet.getRange("C5:C14").format.horizontalAlignment = "right";
sheet.getRange("A4:C14").format.borders = {
  insideHorizontal: { style: "thin", color: "#DDE5E7" },
  bottom: { style: "thin", color: "#94A3B8" },
};
sheet.getRange("A4:C4").format.rowHeight = 26;
sheet.getRange("A5:C14").format.rowHeight = 22;

sheet.getRange("E2:F2").merge();
sheet.getRange("E2").values = [["클릭 수 상위 5개"]];
sheet.getRange("E2:F2").format = {
  fill: "#CCFBF1",
  font: { bold: true, color: "#115E59", size: 12 },
};
sheet.getRange("E4:F9").values = [
  ["링크 이름", "클릭 수"],
  [null, null], [null, null], [null, null], [null, null], [null, null],
];
for (let row = 5; row <= 9; row += 1) {
  const rank = row - 4;
  sheet.getRange(`F${row}`).formulas = [[`=LARGE($C$5:$C$14,${rank})`]];
  sheet.getRange(`E${row}`).formulas = [[`=INDEX($A$5:$A$14,MATCH(F${row},$C$5:$C$14,0))`]];
}
sheet.getRange("E4:F4").format = {
  fill: "#134E4A",
  font: { bold: true, color: "#FFFFFF" },
};
sheet.getRange("E5:F9").format.fill = "#F0FDFA";
sheet.getRange("F5:F9").format.numberFormat = "#,##0";
sheet.getRange("E4:F9").format.borders = {
  insideHorizontal: { style: "thin", color: "#CCFBF1" },
  outside: { style: "thin", color: "#5EEAD4" },
};

sheet.getRange("C5:C14").conditionalFormats.add("dataBar", {
  color: "#14B8A6",
  gradient: true,
});

const chart = sheet.charts.add("bar", sheet.getRange("E4:F9"));
chart.title = "클릭 수 상위 5개 링크";
chart.titleTextStyle.fontSize = 13;
chart.hasLegend = false;
chart.xAxis = { axisType: "textAxis", textStyle: { fontSize: 10 } };
chart.yAxis = { numberFormatCode: "#,##0" };
chart.setPosition("E11", "L27");

sheet.getRange("A:C").format.verticalAlignment = "center";
sheet.getRange("A:A").format.columnWidth = 20;
sheet.getRange("B:B").format.columnWidth = 42;
sheet.getRange("C:C").format.columnWidth = 13;
sheet.getRange("D:D").format.columnWidth = 3;
sheet.getRange("E:E").format.columnWidth = 21;
sheet.getRange("F:F").format.columnWidth = 13;
sheet.freezePanes.freezeRows(4);

const tableCheck = await workbook.inspect({
  kind: "table",
  range: "'LinkSnip 클릭 현황'!A1:F14",
  include: "values,formulas",
  tableMaxRows: 20,
  tableMaxCols: 8,
});
console.log(tableCheck.ndjson);

const errorCheck = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log(errorCheck.ndjson);

const drawingCheck = await workbook.inspect({ kind: "drawing", maxChars: 3000 });
console.log(drawingCheck.ndjson);

const preview = await workbook.render({
  sheetName: "LinkSnip 클릭 현황",
  autoCrop: "all",
  scale: 1.5,
  format: "png",
});
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(JSON.stringify({ outputPath, previewPath }));
