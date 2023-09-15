import Fastify from "fastify";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import cors from "@fastify/cors";
import fs from "fs";
import util from "util";
import { pipeline } from "stream";

// Cafe Imports
import {
  CreateCafeSchema,
  UpdateCafeSchema,
  DeleteCafeSchema,
} from "./schema/cafe.js";
import {
  CreateCafe,
  UpdateCafe,
  DeleteCafe,
  GetCafes,
} from "./service/cafe.js";

// Employee Imports
import {
  CreateEmployeeSchema,
  UpdateEmployeeSchema,
  DeleteEmployeeSchema,
} from "./schema/employee.js";
import {
  CreateEmployee,
  UpdateEmployee,
  DeleteEmployee,
  GetEmployees,
} from "./service/employee.js";

const pump = util.promisify(pipeline);

const app = Fastify({
  logger: true,
});

app.register(multipart);

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

app.register(fastifyStatic, {
  root: process.cwd() + "/uploads",
  prefix: "/public/",
});

app.get("/ping", async function handler(_request, _reply) {
  return "pong";
});

app.post("/upload", async function (request, _reply) {
  const parts = request.files();
  for await (const part of parts) {
    await pump(part.file, fs.createWriteStream(`./uploads/${part.filename}`));
  }
  return { status: "ok" };
});

// Get API
app.get("/cafes", GetCafes);
app.get("/employees", GetEmployees);

// Cafe API
app.post("/cafe", CreateCafeSchema, CreateCafe);
app.put("/cafe", UpdateCafeSchema, UpdateCafe);
app.delete("/cafe", DeleteCafeSchema, DeleteCafe);

// Employee API
app.post("/employee", CreateEmployeeSchema, CreateEmployee);
app.put("/employee", UpdateEmployeeSchema, UpdateEmployee);
app.delete("/employee", DeleteEmployeeSchema, DeleteEmployee);

try {
  await app.listen({ port: 3001 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
