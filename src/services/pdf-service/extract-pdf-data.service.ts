import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { ClientDTO } from "../dto";

export const getAllPdf = async (clientData: ClientDTO) => {
    const existingPdf = await prisma.pdfClientData.findFirst({
        where: {
            clientNumber: clientData.clientNumber,
            fileName: clientData.fileName,
        },
    });

    if (existingPdf) {
        return;
    }

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
            energiaCompensada: clientData.energiaCompensada
                ? {
                      create: {
                          unidade: clientData.energiaCompensada.unidade,
                          quantidade: clientData.energiaCompensada.quantidade,
                          precoUnit: clientData.energiaCompensada.precoUnit,
                          valorTotal: clientData.energiaCompensada.valorTotal,
                          pisCofins: clientData.energiaCompensada.pisCofins,
                          icms: clientData.energiaCompensada.icms,
                          tarifaUnit: clientData.energiaCompensada.tarifaUnit,
                      },
                  }
                : undefined,
            contribuicaoIlumPublica: clientData.contribuicaoIlumPublica
                ? {
                      create: {
                          unidade: clientData.contribuicaoIlumPublica.unidade,
                          quantidade: clientData.contribuicaoIlumPublica.quantidade,
                          valorTotal: clientData.contribuicaoIlumPublica.valorTotal,
                      },
                  }
                : undefined,
            total: clientData.total
                ? {
                      create: {
                          unidade: clientData.total.unidade,
                          quantidade: clientData.total.quantidade,
                          valorTotal: clientData.total.valorTotal,
                      },
                  }
                : undefined,
            bandeiraVermelha: clientData.bandeiraVermelha
                ? {
                      create: {
                          unidade: clientData.bandeiraVermelha.unidade,
                          quantidade: clientData.bandeiraVermelha.quantidade,
                          valorTotal: clientData.bandeiraVermelha.valorTotal,
                      },
                  }
                : undefined,
        },
    });

    return pdfs;
};

export const getAllInfo = async () => {
    const data = await prisma.pdfClientData.findMany({
        include: {
            valoresFaturados: true,
            energiaCompensada: true,
            contribuicaoIlumPublica: true,
            total: true,
            bandeiraVermelha: true,
        },
    });
    return data;
};
