/* istanbul ignore next */

import type { FastifyInstance } from "fastify";
import pdf from "./pdf.router";

export default async function (service: FastifyInstance) {
    service.register(pdf, { prefix: "/api" });
}
