const {model, Schema} = require("mongoose");

const imageSchema = new Schema({
  fileSizeBytes: { type: Number, require: true },
  url: {type: String, require: true}
});

module.exports = model("images", imageSchema);
