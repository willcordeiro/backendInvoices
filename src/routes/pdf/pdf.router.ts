import type { FastifyInstance } from "fastify";
import { getAllInfo, getAllPdf } from "../../services/pdf-service";
import { getClientDataFromPdfs } from "../../utils/extract-pdf.utils";

export default async function (server: FastifyInstance) {
    server.get("/get-pdfs", async (request, reply) => {
        try {
            const clientDTOList = await getClientDataFromPdfs();

            const results = await Promise.all(
                clientDTOList.map((clientDTO) => getAllPdf(clientDTO))
            );

            reply.send(results);
        } catch (error) {
            reply.status(500).send({ message: "Error processing PDFs", error: error });
        }
    });

    server.get("/allPdf", async (request, reply) => {
        try {
            const pdfs = await getAllInfo();
            reply.send(pdfs);
        } catch (error) {
            reply.status(500).send({ message: "Error processing PDFs", error: error });
        }
    });
}
