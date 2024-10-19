import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { ClientDTO } from "../dto";

export const getAllPdf = async (clientData: ClientDTO) => {
    console.log(clientData);
    const pdfs = await prisma.pdfClientData.create({
        data: {
            fileName: clientData.fileName,
            clientNumber: clientData.clientNumber,
            installationNumber: clientData.installationNumber,
            vencimento: clientData.vencimento,
            data: clientData.data,
            valorAPagar: clientData.valorAPagar,
            notaFiscal: clientData.notaFiscal,
            serie: clientData.serie,
            dataEmissao: clientData.dataEmissao,
            codigoDeBarras: clientData.codigoDeBarras,
            icmsTotal: clientData.icmsTotal,
            pasepTotal: clientData.pasepTotal,
            cofinsTotal: clientData.cofinsTotal,
            nomeCliente: clientData.nomeCliente,
            distribuidora: clientData.distribuidora,
            valoresFaturados: {
                create: clientData.valoresFaturados.map((valor) => ({
                    tipo: valor.tipo,
                    quantidade: valor.quantidade.toString(),
                    precoUnit: valor.precoUnit.toString(),
                    valorTotal: valor.valorTotal,
                    pisCofins: valor.pisCofins,
                    icms: valor.icms,
                    tarifaUnit: valor.tarifaUnit,
                })),
            },
        },
    });

    return pdfs;
};
export const getAllInfo = async () => {
    const data = await prisma.pdfClientData.findMany({
        include: {
            valoresFaturados: true,
        },
    });
    return data;
};
