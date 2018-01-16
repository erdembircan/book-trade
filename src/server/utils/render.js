export default (html, loadableState) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Book Club</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script src="/client/vendor.js"></script>
            <script src="/client/client.js"></script>
            ${loadableState.getScriptTag()}
        </body>
    </html>
`;
