// Thanks Leftium - answer from Stack Overflow
// https://stackoverflow.com/questions/72550095/how-to-convert-specific-html-table-with-specific-columns-values-to-excel-using-j/72616993#72616993

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://renatocfrancisco.github.io/getTableWithPuppeteer/');

  // Get array of elementHandles from page matching this CSS selector.
  const elements = await page.$$('table table td');

  // it works if you add the whole path like: page.$$(table tbody tr td table tbody tr td)
  // it works if the table is inside another with an #id: page.$$(#id table table td)

  const columns = [];
  const values  = [];

  // Process the elementHandles.
  let i = 0;
  for (const element of elements) {
    // Extract text from elementHandle.
    const text = await element.evaluate(el => el.textContent);
    if ((i++ % 2) == 0) {
        // Even elements are columns.
        columns.push(text);
    } else {
        // Odd elements are values.
        values.push(text);
    }
  };

  // Construct CSV string.
  const csv = `${columns.join(',')}\n${values.join(',')}`;
  console.log(csv);

  await browser.close();
})();