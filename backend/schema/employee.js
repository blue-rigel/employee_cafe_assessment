const EmployeeBodySchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email_address: { type: "string" },
    phone_number: { type: "string" },
    gender: { type: "string", enum: ["Male", "Female"] },
    cafeId: { type: "string" },
    start_date: { type: "string" },
  },
  required: ["id", "name", "email_address", "phone_number", "gender"],
};

const DeleteEmployeeBodySchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

const EmployeeResponseSchema = {
  type: "object",
  properties: {
    status: { type: "string" },
    message: { type: "string" },
  },
};

export const CreateEmployeeSchema = {
  schema: {
    body: EmployeeBodySchema,
    response: {
      200: EmployeeResponseSchema,
    },
  },
};

export const UpdateEmployeeSchema = {
  schema: {
    body: EmployeeBodySchema,
    response: {
      200: EmployeeResponseSchema,
    },
  },
};

export const DeleteEmployeeSchema = {
  schema: {
    body: DeleteEmployeeBodySchema,
    response: {
      200: EmployeeResponseSchema,
    },
  },
};
