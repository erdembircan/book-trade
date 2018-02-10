export default (html, loadableState, windowGlobals) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Book Club</title>
            <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
        </head>
        <body>
            <div id="root">${html}</div>
            ${windowGlobals}
            <script src="/public/vendor.js"></script>
            <script src="/public/client.js"></script>
            ${loadableState.getScriptTag()}
            <audio src='public/sounds/chime.wav' data-audio='notify'/>
        </body>
    </html>
`;
