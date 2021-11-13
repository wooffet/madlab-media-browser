const express = require("express");
const controller = require("../controller/file.controller");
const router = express.Router();

const initRoutes = (app) => {
  router.get("/", controller.getFileList);
  router.get("/files", controller.getFileList);
  router.get("/files/:folder", controller.getFileList);
  router.get("/file/:name", controller.downloadFile);
  router.get("/file/:folder/:name", controller.downloadFile);
  router.get("/ziprequests", controller.getZipRequests);
  router.get("/zip/:folder", controller.addZipRequest);

  app.use(router);
};

module.exports = initRoutes;
