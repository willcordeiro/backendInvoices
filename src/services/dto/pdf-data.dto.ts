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

const EnergiaCompensadaSchema = z
    .object({
        unidade: z.string(),
        quantidade: z.string(),
        precoUnit: z.string(),
        valorTotal: z.string(),
        pisCofins: z.string(),
        icms: z.string(),
        tarifaUnit: z.string(),
    })
    .nullable();

const ContribuicaoIlumPublicaSchema = z
    .object({
        unidade: z.string(),
        quantidade: z.string(),
        valorTotal: z.string(),
    })
    .nullable();

const TotalSchema = z
    .object({
        unidade: z.string(),
        quantidade: z.string(),
        valorTotal: z.string(),
    })
    .nullable();

const BandeiraVermelhaSchema = z
    .object({
        unidade: z.string(),
        quantidade: z.string(),
        valorTotal: z.string(),
    })
    .nullable();

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
    energiaCompensada: EnergiaCompensadaSchema.optional(),
    contribuicaoIlumPublica: ContribuicaoIlumPublicaSchema.optional().nullable(),
    total: TotalSchema.optional(),
    bandeiraVermelha: BandeiraVermelhaSchema.optional().nullable(),
});

export type ClientDTO = z.infer<typeof ClientSchema>;
export type ValorFaturadoDTO = z.infer<typeof ValorFaturadoSchema>;
export type TotalDTO = z.infer<typeof TotalSchema>;
export type ContribuicaoIlumPublicaDTO = z.infer<typeof ContribuicaoIlumPublicaSchema>;
export type BandeiraVermelhaDTO = z.infer<typeof BandeiraVermelhaSchema>;
