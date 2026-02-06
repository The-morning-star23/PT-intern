import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api", // Path to your API routes
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Appointment Booking API",
        version: "1.0.0",
        description: "Core APIs for Patient and Doctor scheduling logic.",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [],
    },
  });
  return spec;
};