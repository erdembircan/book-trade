export default (html, loadableState, preloadedState) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Book Club</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}</script>
            <script src="/public/client/vendor.js"></script>
            <script src="/public/client/client.js"></script>
            ${loadableState.getScriptTag()}
        </body>
    </html>
`;
