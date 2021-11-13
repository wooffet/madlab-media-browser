const fs = require("fs");
const { exec } = require("child_process");
const EventEmitter = require("events");
const { renderGetFilesPage, renderAddZipRequestPage } = require("../utils/render-pages.util");
const bus = new EventEmitter();
const baseUrl = "http://localhost:48080/";
let zipRequests = [];
let isProcessingZipRequest = false;

const getFileList = async (req, res) => {
  let sharedFilesList = [];
  let getCurrentFolder = undefined;
  let getZipQueue = undefined;

  const requestedPath = req.params.folder
    ? __sharedir + req.params.folder
    : __sharedir;

  fs.readdir(requestedPath, (err, files) => {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    if (req.params.folder) {
      getCurrentFolder = () => { return __sharedDir + req.params.folder; };
    }

    if (isProcessingZipRequest) {
      getZipQueue = () => { return zipRequests; };
    }

    files.forEach((file) => {
      const fileUrl = encodeURIComponent(
        req.params.folder ? `${req.params.folder}/${file}` : file
      );
      if (fs.statSync(requestedPath + "/" + file).isDirectory()) {
        sharedFilesList.push({
          name: file,
          type: "Folder",
          url: baseUrl + "files/" + fileUrl,
          zip_request: baseUrl + "zip/" + fileUrl,
        });
      } else {
        sharedFilesList.push({
          name: file,
          type: "File",
          url: baseUrl + "file/" + fileUrl,
        });
      }
    });

    const renderedPage = renderGetFilesPage(sharedFilesList, getCurrentFolder, getZipQueue);

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(renderedPage);
  });
};

const downloadFile = async (req, res) => {
  const fileName = req.params.name;

  res.download(__sharedir + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Error downloading file: " + err,
      });
    }
  });
};

const getZipRequests = async (req, res) => {
  res
    .status(200)
    .send(zipRequests.length < 0 ? zipRequests : "No zip requests queued!");
};

const addZipRequest = async (req, res) => {
  const renderMessage = () => {
    let message = "";
    if (zipRequests.includes(req.params.folder)) {
      message = `There is already a zip request for "${req.params.folder}"! :D`;
    } else {
      message = `Zip request for "${req.params.folder}" received and added to queue! :)`;
    }

    return message;
  }

  const renderedPage = renderAddZipRequestPage(renderMessage)

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(renderedPage);

  await processZipRequest(req.params.folder);
};

const processZipRequest = async (targetFolder) => {
  const outputFileName = `${targetFolder}-zipped`;
  const inputFilePath = `${targetFolder}`;

  zipRequests.push(targetFolder);

  if (isProcessingZipRequest) {
    await new Promise((resolve) => bus.once("startNewZipRequest", resolve));
  }

  isProcessingZipRequest = true;

  exec(
    `cd ~/madlab-media-browser/share && zip -r "${outputFileName}" "${inputFilePath}"`,
    (err, stdout) => {
      if (err) {
        console.log(err);
      }

      console.log(stdout);
      console.log("Zip complete");
      completeZipRequest(targetFolder);
    }
  );
};

const completeZipRequest = (targetFolder) => {
  zipRequests.filter((zr) => zr !== targetFolder);
  isProcessingZipRequest = false;
  bus.emit("startNewZipRequest");
};

module.exports = {
  getFileList,
  downloadFile,
  getZipRequests,
  addZipRequest,
};
