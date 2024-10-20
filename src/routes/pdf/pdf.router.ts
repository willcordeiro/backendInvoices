import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getAllInfo } from "../../services/pdf-service";
import fs from "fs";
import path from "node:path";
import { workspacePath } from "../../config/constants";

export default async function (server: FastifyInstance) {
    server.get("/allPdf", async (request, reply) => {
        try {
            const pdfs = await getAllInfo();
            reply.send(pdfs);
        } catch (error) {
            reply.status(500).send({ message: "Error processing PDFs", error: error });
        }
    });

    server.post(
        "/download-pdf",
        async (request: FastifyRequest<{ Body: { fileName: string } }>, reply: FastifyReply) => {
            const { fileName } = request.body;

            if (!fileName) {
                return reply.status(400).send({ message: "Nome do arquivo não fornecido." });
            }

            try {
                const filePath = path.join(workspacePath, "static", "pdf", fileName);

                if (!fs.existsSync(filePath)) {
                    return await reply.status(404).send({ message: "Arquivo não encontrado." });
                }

                const fileStream = fs.createReadStream(filePath);
                reply.header("Content-Disposition", `attachment; filename=${fileName}`);
                reply.type("application/pdf");
                return await reply.send(fileStream);
            } catch (error) {
                console.error("Erro ao processar o download do PDF:", error);
                return reply.status(500).send({ message: "Erro interno ao processar o PDF." });
            }
        }
    );
}
