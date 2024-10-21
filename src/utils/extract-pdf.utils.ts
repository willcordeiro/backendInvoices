import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse";
import { ClientDTO } from "../services/dto";

export const pdfDirectory = "./static/pdf";

export function extractPdfData(pdfText: string, fileName: string): ClientDTO {
    const nomeCliente =
        pdfText.match(/DÉBITO AUTOMÁTICO\s*([A-Z\s]+)\s+AV\b/)?.[1].trim() ||
        pdfText.match(/([A-Z\s]+)\s+(\d{8})/)?.[1].trim() ||
        "";

    const clientNumberMatch = pdfText.match(/DA INSTALAÇÃO\s*(\d+)\s*(\d*)/i);
    const dataMatches = pdfText.match(/([A-Z]{3}\/\d{4})/g);
    const vencimentoMatch = pdfText.match(/(\d{2}\/\d{2}\/\d{4})/i);
    const valorMatch = pdfText.match(/R\$\s*([\d.,]+)/i);
    const notaFiscalSerieMatch = pdfText.match(
        /NOTA FISCAL\s*N[ºo]\s*(\d+)\s*-\s*S[ÉE]RIE\s*(\d+)/i
    );
    const dataEmissaoMatch = pdfText.match(/Data de emissão:\s*(\d{2}\/\d{2}\/\d{4})/i);
    const codigoDeBarrasMatch = pdfText.match(/(\d{11}-\d\s+\d{11}-\d\s+\d{11}-\d\s+\d{11}-\d)/i);

    const tabelaFaturadosMatches = [
        ...pdfText.matchAll(
            /(Energia .+?)(kWh|Unid)\s+(\d+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)/g
        ),
    ];

    const valoresEspecificosMatches = [
        ...(pdfText.match(
            /Energia compensada GD IkWh\s+(\d+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)/
        ) || []),
        ...(pdfText.match(/Contrib Ilum Publica Municipal\s+([\d.,]+)/) || []),
        ...(pdfText.match(/TOTAL\s+([\d.,]+)/) || []),
        ...(pdfText.match(/Bandeira Vermelha - Já Incluído no valor a pagar\s+([\d.,]+)/) || []),
    ];

    const icmsMatch = pdfText.match(/ICMS\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)/);
    const pasepMatch = pdfText.match(/PASEP\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)/);
    const cofinsMatch = pdfText.match(/COFINS\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]+)/);

    const valoresFaturados = tabelaFaturadosMatches.map((match) => ({
        tipo: match[1].trim(),
        quantidade: parseFloat(match[3].trim()),
        precoUnit: parseFloat(match[4].trim()),
        valorTotal: match[5].trim(),
        pisCofins: match[6].trim(),
        icms: match[7].trim(),
        tarifaUnit: match[8].trim(),
    }));

    return {
        fileName,
        clientNumber: clientNumberMatch?.[1]?.trim() || "",
        installationNumber: clientNumberMatch?.[2]?.trim() || "",
        vencimento: vencimentoMatch?.[1]?.trim() || "",
        data:
            dataMatches && dataMatches.length > 0 ? dataMatches.map((date) => date.trim())[0] : "",
        valorAPagar: valorMatch?.[1]?.trim() || "",
        notaFiscal: notaFiscalSerieMatch?.[1]?.trim() || "",
        serie: notaFiscalSerieMatch?.[2]?.trim() || "",
        dataEmissao: dataEmissaoMatch?.[1]?.trim() || "",
        codigoDeBarras: codigoDeBarrasMatch?.[1]?.replace(/\s+/g, " ").trim() || "",
        valoresFaturados: valoresFaturados.length > 0 ? valoresFaturados : [],
        icmsTotal: icmsMatch?.[1]?.trim() || "",
        pasepTotal: pasepMatch?.[1]?.trim() || "",
        cofinsTotal: cofinsMatch?.[1]?.trim() || "",
        nomeCliente: nomeCliente,
        distribuidora: pdfText.includes("CEMIG") ? "CEMIG" : "CEMIG",
        energiaCompensada: valoresEspecificosMatches[0]
            ? {
                  unidade: "kWh",
                  quantidade: valoresEspecificosMatches[1],
                  precoUnit: valoresEspecificosMatches[2].replace(/[^0-9.,]+/g, ""),
                  valorTotal: valoresEspecificosMatches[3],
                  pisCofins: valoresEspecificosMatches[4],
                  icms: valoresEspecificosMatches[5],
                  tarifaUnit: valoresEspecificosMatches[6],
              }
            : null,
        contribuicaoIlumPublica: valoresEspecificosMatches[0]
            ? {
                  unidade: "R$",
                  quantidade: valoresEspecificosMatches[0]
                      .replace(/[^0-9.,]+/g, "")
                      .replace(",", "."),

                  valorTotal: valoresEspecificosMatches[0]
                      .replace(/[^0-9.,]+/g, "")
                      .replace(",", "."),
              }
            : null,
        total: valoresEspecificosMatches[2]
            ? {
                  unidade: "R$",
                  quantidade: valoresEspecificosMatches[2]
                      .replace(/[^0-9.,]+/g, "")
                      .replace(",", "."),

                  valorTotal: valoresEspecificosMatches[2]
                      .replace(/[^0-9.,]+/g, "")
                      .replace(",", "."),
              }
            : null,
        bandeiraVermelha: valoresEspecificosMatches[3]
            ? {
                  unidade: "R$",
                  quantidade: valoresEspecificosMatches[3].replace(",", "."),

                  valorTotal: valoresEspecificosMatches[3].replace(",", "."),
              }
            : null,
    };
}
export interface PdfClientData {
    fileName: string;
    clientNumber: string | null;
    installationNumber: string | null;
    vencimento: string | null;
    data: string | null;
    valorAPagar: string | null;
    notaFiscal: string | null;
    serie: string | null;
    dataEmissao: string | null;
    codigoDeBarras: string | null;
    valoresFaturados: Array<{
        tipo: string;
        quantidade: number;
        precoUnit: number;
        valorTotal: string;
        pisCofins: string;
        icms: string;
        tarifaUnit: string;
    }> | null;
    icmsTotal: string | null;
    pasepTotal: string | null;
    cofinsTotal: string | null;
    nomeCliente: string | null;
    distribuidora: string | null;
    energiaCompensada: {
        unidade: string;
        quantidade: string;
        precoUnit: string;
        valorTotal: string;
        pisCofins: string;
        icms: string;
        tarifaUnit: string;
    } | null;
}

export async function getClientDataFromPdfs(): Promise<ClientDTO[]> {
    try {
        const pdfFiles = await fs.readdir(pdfDirectory);

        const clientDTOList: ClientDTO[] = [];

        for (const file of pdfFiles) {
            const filePath = path.join(pdfDirectory, file);
            const fileBuffer = await fs.readFile(filePath);
            const data = await pdfParse(fileBuffer);

            const clientData = extractPdfData(data.text, file);

            clientDTOList.push(clientData);
        }

        return clientDTOList;
    } catch (err) {
        console.error(`Erro ao processar PDFs: ${err}`);
        throw new Error(
            `Erro ao processar PDFs: ${err instanceof Error ? err.message : "Erro desconhecido"}`
        );
    }
}
