export const swaggerConfig = {
    swagger: {
        info: {
            title: "Fastify Boilerplate",
            description: "API Boilerplate Docs",
            version: "0.0.0",
        },
        // host: `localhost:${process.env.PORT}`,
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
    },
};
