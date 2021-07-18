
const MongodbImageShema = require("../schema/image.schema.ts");
const Axios = require("axios");
const Joi = require("joi");

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
        console.log("VIDEO ", dataImage);
        console.log("it`s not image " + checkedImage);
      } else {
        const { fileSizeBytes, url } = dataImage;
        const imageSave = new MongodbImageShema({fileSizeBytes, url});
        console.log(imageSave);
        const savedImages = await imageSave.save();
        return res.status(201).json(savedImages);
      }
    }
  }

      validateImageDate(req, res, next) {
        const validSchema = Joi.object({
          fileSizeBytes: Joi.number().required(),
          url: Joi.string().required()

        });
        const validResult = validSchema.validate(req, res, next);
        if (validResult.error) {
          return res.status(400).send(validResult.error.details);
        }
        next();
      }
    
  async getRequestImage(req, res, next) {
    try {
       const findDate = MongodbImageShema.find(
    //request
      );
      console.log(findDate._conditions)
      return res.status(200).json(findDate._conditions);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new statisticControllers();
