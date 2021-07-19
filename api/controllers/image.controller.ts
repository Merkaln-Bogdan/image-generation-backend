
const Axios = require("axios");
const Joi = require("joi");
const ImageModel = require("../schema/image.schema.ts")

class statisticControllers {
 
  async getRandomImages(req, res, next) {
    let dataImage = null;
    {
      try {
        await Axios.get("https://random.dog/woof.json").then((response) => {
          dataImage = response.data;
        });
      } catch (error) {
        next(error);
      }
      const checkedImage = dataImage.url.split(".").pop();
      if (checkedImage === "mp4" || checkedImage === "gif") {

          await Axios.get("https://random.dog/woof.json").then((response) => {
            dataImage = response.data;
          });
      
      } else {
        const { fileSizeBytes, url } = dataImage;
        const imageSave = new ImageModel({ fileSizeBytes, url });
        console.log(imageSave);

        const savedImages = await imageSave.save();
        return res.status(201).json(savedImages);
      }
    }
  }

  validateImageDate(req, res, next) {
    const validSchema = Joi.object({
      fileSizeBytes: Joi.number().required(),
      url: Joi.string().required(),
    });
    const validResult = validSchema.validate(req, res, next);
    if (validResult.error) {
      return res.status(400).send(validResult.error.details);
    }
    next();
  }

  async getRequestImage(req, res, next) {

   
    try {
      const image = await ImageModel.findOne(req.body);
      if (!image) {
        return res.status(404).json("not found");
      }
      return res.status(200).json(image);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new statisticControllers();
