// Thanks Leftium - answer from Stack Overflow
// https://stackoverflow.com/questions/72550095/how-to-convert-specific-html-table-with-specific-columns-values-to-excel-using-j/72616993#72616993

const puppeteer = require("puppeteer");

var xl = require("excel4node");
var wb = new xl.Workbook();
var ws = wb.addWorksheet("Sheet 1");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://renatocfrancisco.github.io/getTableWithPuppeteer/");

  // Get array of elementHandles from page matching this CSS selector.
  const elements = await page.$$("table table td");

  // it works if you add the whole path like: page.$$(table tbody tr td table tbody tr td)
  // it works if the table is inside another with an #id: page.$$(#id table table td)

  // Process the elementHandles.
  let i = 0;
  let columnIndex = 1;
  let colunas = ['Column1', 'Column2', 'Column3']

  for (let index = 0; index < colunas.length; index++) {
    ws.cell(1, index + 1).string(colunas[index])
    
  }

  for (const element of elements) {
    const text = await element.evaluate((el) => el.textContent);
    if (i++ % 2 != 0) {
      ws.cell(2, columnIndex++).string(text);
    }
  }

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  today.toDateString();
  output = "spreadsheet.xlsx";

  wb.write(output);

  await browser.close();
})();
