const CreateCafeBodySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    location: { type: "string" },
  },
  required: ["name", "description", "location"],
};

const UpdateCafeBodySchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    location: { type: "string" },
  },
  required: ["id", "name", "description", "location"],
};

const DeleteCafeBodySchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

const CafeResponseSchema = {
  type: "object",
  properties: {
    status: { type: "string" },
    message: { type: "string" },
  },
};

export const CreateCafeSchema = {
  schema: {
    body: CreateCafeBodySchema,
    response: {
      200: CafeResponseSchema,
    },
  },
};

export const UpdateCafeSchema = {
  schema: {
    body: UpdateCafeBodySchema,
    response: {
      200: CafeResponseSchema,
    },
  },
};

export const DeleteCafeSchema = {
  schema: {
    body: DeleteCafeBodySchema,
    response: {
      200: CafeResponseSchema,
    },
  },
};
