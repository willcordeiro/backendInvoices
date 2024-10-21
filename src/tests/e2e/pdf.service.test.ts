import { registerPdfData } from "../../services/pdf-service";
import { mockClientDataValues } from "./mock.pdf";

describe("PDF Service", () => {
    describe("getAllPdf", () => {
        it("should create a new PDF entry if it doesn't exist", async () => {
            const result = await registerPdfData(mockClientDataValues);
            expect(result).toEqual({ ...mockClientDataValues });
        });
    });

    describe("getAllPdf", () => {
        it("should return undefined if the PDF entry already exists", async () => {
            const result = await registerPdfData(mockClientDataValues);
            expect(result).toBeUndefined();
        });
    });
});
