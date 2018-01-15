export default (html, css) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Get real playlists to share with Spotify</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script src="/client/vendor.js"></script>
            <script src="/client/client.js"></script>
        </body>
    </html>
`;
