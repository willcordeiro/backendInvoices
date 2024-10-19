import { z } from "zod";

const ValorFaturadoSchema = z.object({
    tipo: z.string(),
    quantidade: z.number().positive(),
    precoUnit: z.number().positive(),
    valorTotal: z.string(),
    pisCofins: z.string().optional(),
    icms: z.string().optional(),
    tarifaUnit: z.string().optional(),
});

const ClientSchema = z.object({
    fileName: z.string(),
    clientNumber: z.string(),
    installationNumber: z.string(),
    vencimento: z.string(),
    data: z.string(),
    valorAPagar: z.string(),
    notaFiscal: z.string(),
    serie: z.string(),
    dataEmissao: z.string(),
    codigoDeBarras: z.string(),
    icmsTotal: z.string().optional(),
    pasepTotal: z.string().optional(),
    cofinsTotal: z.string().optional(),
    nomeCliente: z.string(),
    distribuidora: z.string(),
    valoresFaturados: z.array(ValorFaturadoSchema),
});

export type ClientDTO = z.infer<typeof ClientSchema>;
export type ValorFaturadoDTO = z.infer<typeof ValorFaturadoSchema>;
