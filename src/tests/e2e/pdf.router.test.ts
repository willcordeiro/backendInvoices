import { FastifyInstance } from "fastify/types/instance";
import { build } from "../helper";
import { mockPdfs } from "../e2e/mock.pdf";

let app: FastifyInstance;

beforeAll(async () => {
    app = await build();
});

afterAll(async () => {
    await app.close();
});

describe("PDF Routes", () => {
    test("GET /allPdf should return all PDFs", async () => {
        const response = await app.inject({
            method: "GET",
            url: "/api/allPdf",
        });

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.payload)).toEqual(mockPdfs);
    });

    test("POST /download-pdf should return the PDF file", async () => {
        const fileName = "3001116735-01-2024.pdf";

        const response = await app.inject({
            method: "POST",
            url: "/api/download-pdf",
            payload: { fileName },
        });

        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toBe("application/pdf");
        expect(response.headers["content-disposition"]).toBe(`attachment; filename=${fileName}`);
    });

    test("POST /download-pdf should return 400 if fileName is not provided", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/api/download-pdf",
            payload: {},
        });

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.payload)).toEqual({ message: "Nome do arquivo não fornecido." });
    });
});
