import { Page } from "../renderer/renderer.js";
const renderGetFilesPage = (items, getCurrentFolder, getZipQueue) => {
    const page = new Page()
        .bootstrapPage()
        .withTitle("MadLab Media Browser");

    let headerContent = `
        <h1>Welcome to the MadLab Media Browser!</h1>
        <h2>Please make a zip request on folders before attempting to download them!</h2>
    `;

    if (getCurrentFolder) {
        const folder = getCurrentFolder();
        headerContent += `
        <h3>Current folder: ${folder}</h3>
        `;
    } else {
        headerContent += `
        <h3>Current folder: Home</h3>
        `;
    }

    if (getZipQueue) {
        const queueItems = getZipQueue();
        headerContent += `
        <div>
        <h3>Current zip request queue:</h3>
        <ul>
        `;
        queueItems.forEach((item) => {
            headerContent += `
        <li>${item}</li>
        `;
        });
        headerContent += `
        </ul>
        </div>
        `;
    }

    page.withHeaderContent(headerContent);

    let content = "";
    items.forEach((item) => {
        content += `
        <span>
        <p>${item.type}</p>
        <p><a href=${item.url}>${item.name}</a></p>
        ${(item.type === "Folder" ? `<p><a href=${item.zip_request}>Make a zip request for ${item.name}</a></p>` : "")}
        </span>
        `;
    });

    page.withContent(content);

    return page.html;
}

const renderAddZipRequestPage = (renderMessage) => {
    const page = new Page()
        .bootstrapPage()
        .withTitle("MadLab Media Browser")
        .withHeaderContent(`
        <h1>Add a zip request!</h1>
        <h2><a href="~/">Return to home page :)</a></h2>
        `)
        .withContent(renderMessage());

    return page.html;
}

export {
    renderGetFilesPage,
    renderAddZipRequestPage
};