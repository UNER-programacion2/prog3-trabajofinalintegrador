import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API - Sistema de Reservas de Salones",
    version: "1.0.0",
    description: "Documentación de la API (Express + Swagger)",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Servidor local",
    },
  ],

  components: {
      securitySchemes: {
        bearerAuth: { 
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Coloca tu token JWT aquí (ej: Bearer [token])'
        }
      },
      schemas: {
        Salon: {
          type: "object",
          properties: {
            salon_id: { type: "integer", example: 1 },
            titulo: { type: "string", example: "Salón Central" },
            direccion: { type: "string", example: "Calle Falsa 123" },
            capacidad: { type: "integer", example: 50 },
            importe: { type: "number", example: 12000.5 },
            creado: { type: "string", format: "date-time" }
          }
        },
        Servicio: {
          type: "object",
          properties: {
            servicio_id: { type: "integer", example: 1 },
            nombre: { type: "string", example: "Catering" },
            precio: { type: "number", example: 2500.0 },
            activo: { type: "integer", example: 1 }
          }
        },
        Turno: {
          type: "object",
          properties: {
            turno_id: { type: "integer", example: 1 },
            orden: { type: "integer", example: 1 },
            hora_desde: { type: "string", example: "09:00" },
            hora_hasta: { type: "string", example: "17:00" },
            activo: { type: "integer", example: 1 }
          }
        },
        ReservaServicioInput: {
          type: "object",
          properties: {
            reserva_id: { type: "integer", example: 123 },
            servicios: {
              type: "array",
              items: { type: "integer", example: 1 }
            }
          },
          required: ["reserva_id","servicios"]
        }
      }
    }
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger UI disponible en: http://localhost:3000/api-docs");
};
