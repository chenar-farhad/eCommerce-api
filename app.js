import express from "express";
import Mangoose from "mongoose";
import bodyParser from "body-parser";
import productRouter from "./src/routes/product.routes.js";
import usersRouter from "./src/routes/users.routes.js";
import categoriesRouter from "./src/routes/categories.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import storeRoutes from "./src/routes/store.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import swaggerUi from "swagger-ui-express";
import Winston from "winston";
import dotenv from "dotenv";
import yamlJs from "yamljs";
import "winston-mongodb";

async function main() {
  dotenv.config("dotenv");
  const url = process.env.DB_URL;
  const app = express();
  await Mangoose.connect(url);

  const docs = yamlJs.load("./swagger.yaml");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));

  Winston.add(
    new Winston.transports.MongoDB({
      db: url,
      level: "error",
      options: { useUnifiedTopology: true }, //bo naheshtni warringek
    })
  );
  Winston.add(
    new Winston.transports.MongoDB({
      db: url,
      level: "info",
      options: { useUnifiedTopology: true }, //bo naheshtni warringek
    })
  );

  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(categoriesRouter);
  app.use(productRouter);
  app.use(usersRouter);
  app.use(authRoutes);
  app.use(storeRoutes);
  app.use(orderRoutes);

  //port
  app.listen(process.env.PORT, () => {
    console.log(
      `Example app listening at http://localhost:${process.env.PORT}`
    );
  });
}
main();
