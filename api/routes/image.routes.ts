const { Router } = require("express");

const imageController = require("../controllers/image.controller.ts");

const imageRouter = Router();

imageRouter.post("/upload/dog/image",
imageController.getRandomImages);

  imageRouter.get("/list/dog/images", imageController.getRequestImage);

module.exports = imageRouter;
