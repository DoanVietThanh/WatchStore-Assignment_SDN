import cors from "cors";
import * as dotenv from "dotenv";
import express, { Application } from "express";
import { dbConnect } from "./config/database";
import { mainRoutes } from "./routes";
import { errorHandler, notFound } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";

const app: Application = express();
dotenv.config();
const port = process.env.PORT_SERVER || 5000;
dbConnect();

app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", mainRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
