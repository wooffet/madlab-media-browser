const renderGetFilesPage = (items, getCurrentFolder, getZipQueue) => {
    let html = `
    <html>
    <head>
        <title>MadLab Media Browser</title>
    </head>
    <body>
        <div>
        <h1>Welcome to the MadLab Media Browser!</h1>
        <h2>Please make a zip request on folders before attempting to download them!</h2>
    `;

    if (getCurrentFolder) {
        const folder = getCurrentFolder();
        html += `
        <h3>Current folder: ${folder}</h3>
        `;
    } else {
        html += `
        <h3>Current folder: Home</h3>
        `;
    }
    html += `
        </div>
        `;

    if (getZipQueue) {
        const queueItems = getZipQueue();
        html += `
        <div>
        <h3>Current zip request queue:</h3>
        <ul>
        `;
        queueItems.forEach((item) => {
            html += `
        <li>${item}</li>
        `;
        });
        html += `
        </ul>
        </div>
        `;
    }

    html += `
        <div>
        `;

    items.forEach((item) => {
        html += `
        <span>
        <p>${item.type}</p>
        <p><a href=${item.url}>${item.name}</a></p>
        ${(item.type === "Folder" ? `<p><a href=${item.zip_request}>Make a zip request for ${item.name}</a></p>` : "")}
        </span>
        `;
    });
    html += `
        </div>
        </body>
        </html>
        `;

    return html;
}

const renderAddZipRequestPage = (renderMessage) => {
    let html = `
    <html>
    <head>
        <title>MadLab Media Browser</title>
    </head>
    <body>
        <div>
        <h1>Add a zip request!</h1>
        <h2><a href="~/">Return to home page :)</a></h2>
        </div>
    `;

    html += `
        <div>
            ${renderMessage()}
        </div>
        </body>
        </html>
        `;

    return html;
}

module.exports = {
    renderGetFilesPage,
    renderAddZipRequestPage
}