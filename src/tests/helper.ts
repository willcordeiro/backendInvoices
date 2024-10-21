import Fastify from "fastify";
import pdfRoutes from "../routes/pdf";

export async function build() {
    const app = Fastify();

    app.register(pdfRoutes);

    await app.ready();
    return app;
}
