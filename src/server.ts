import "dotenv/config";
import Fastify from "fastify";
import { fastifyFormbody } from "@fastify/formbody";
import pdf from "./routes/pdf";
import ShortUniqueId from "short-unique-id";
import { swaggerConfig } from "./swagger";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import cors from "@fastify/cors";

const service = Fastify({
    logger: {
        name: "fastify-boilerplate",
        level: "trace",
    },
    genReqId: () => new ShortUniqueId({ length: 10 }).randomUUID(),
});

service.register(cors, {
    origin: "*",
});

service.register(fastifyFormbody);
service.register(swagger, swaggerConfig);
service.register(swaggerUi, { routePrefix: "/docs" });

// Endpoint routers
service.register(pdf);

const start = async () => {
    try {
        const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 9666;
        const host = process.env.HOST || "localhost";
        service.listen({ port: port, host: host }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    } catch (err) {
        service.log.error(err);
        process.exit(1);
    }
};

start();
