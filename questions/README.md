# Shared Questions Backend

This site can use Google Apps Script + Google Sheets as a tiny shared backend for guest questions.

## Setup

1. Create a new Google Sheet.
2. Open `Extensions > Apps Script`.
3. Paste the contents of `google-apps-script.gs`.
4. Save the project.
5. Click `Deploy > New deployment`.
6. Choose type `Web app`.
7. Set:
   - Execute as: `Me`
   - Who has access: `Anyone`
8. Deploy and copy the Web App URL.
9. Paste that URL into `questions/config.js`:

```js
window.partyQuestionsEndpoint = "https://script.google.com/macros/s/.../exec";
```

10. Commit and push the updated `questions/config.js`.

Until the endpoint is filled in, questions are saved only in the current browser.
