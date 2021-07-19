const { connect } = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const userRoute = require("./routes/image.routes.ts");
require("dotenv").config();

module.exports = class StartServer {
  server =  express() 

  constructor(server) {
    this.server = server
  }

  async start() {
    await this.initSevices();
    this.startListening();
  }

  async initSevices() {
    this.initServer();
    this.initMiddleware();
    this.initImageRoutes();
    await this.initDataBase();
 
  }

  getServer() {
    return this.server;
  }

  initServer() {
    this.server = express();
  }

  initMiddleware() {
    this.server.use(express.json());
    this.server.use(morgan("combined"));
    this.server.use(express.static("public"));
    this.server.use(cors());
  }


  initImageRoutes() {
    this.server.use("/", userRoute);
  }

  async initDataBase() {
    try {
      await connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connection successful");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log("Start server");
    });
  }
};
