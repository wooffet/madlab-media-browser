import { Router } from "express";
import { getFileList, downloadFile, getZipRequests, addZipRequest } from "../controller/file.controller.js";
const router = Router();

const initRoutes = (app) => {
  router.get("/", getFileList);
  router.get("/files", getFileList);
  router.get("/files/:folder", getFileList);
  router.get("/file/:name", downloadFile);
  router.get("/file/:folder/:name", downloadFile);
  router.get("/ziprequests", getZipRequests);
  router.get("/zip/:folder", addZipRequest);

  app.use(router);
};

export {
  initRoutes
};
