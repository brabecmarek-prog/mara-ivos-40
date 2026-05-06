const SHEET_NAME = "Questions";

function doGet(e) {
  const action = e.parameter.action || "list";
  const callback = e.parameter.callback || "callback";
  const sheet = getSheet_();
  let payload;

  if (action === "add") {
    const name = String(e.parameter.name || "").trim();
    const text = String(e.parameter.text || "").trim();

    if (name && text) {
      sheet.appendRow([new Date(), name, text]);
    }
    payload = { ok: true };
  } else {
    const rows = sheet.getDataRange().getValues().slice(1);
    payload = {
      ok: true,
      questions: rows.map(function (row) {
        return {
          createdAt: row[0],
          name: row[1],
          text: row[2]
        };
      })
    };
  }

  return ContentService
    .createTextOutput(callback + "(" + JSON.stringify(payload) + ");")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(["createdAt", "name", "text"]);
  }

  return sheet;
}
