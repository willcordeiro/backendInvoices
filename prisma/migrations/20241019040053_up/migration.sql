-- CreateTable
CREATE TABLE "PdfClientData" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "clientNumber" TEXT,
    "installationNumber" TEXT,
    "vencimento" TEXT,
    "data" TEXT NOT NULL,
    "valorAPagar" TEXT,
    "notaFiscal" TEXT,
    "serie" TEXT,
    "dataEmissao" TEXT,
    "codigoDeBarras" TEXT,
    "icmsTotal" TEXT,
    "pasepTotal" TEXT,
    "cofinsTotal" TEXT,
    "nomeCliente" TEXT,
    "distribuidora" TEXT,

    CONSTRAINT "PdfClientData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValoresFaturados" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "precoUnit" TEXT NOT NULL,
    "valorTotal" TEXT NOT NULL,
    "pisCofins" TEXT,
    "icms" TEXT,
    "tarifaUnit" TEXT,
    "pdfClientDataId" INTEGER NOT NULL,

    CONSTRAINT "ValoresFaturados_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ValoresFaturados" ADD CONSTRAINT "ValoresFaturados_pdfClientDataId_fkey" FOREIGN KEY ("pdfClientDataId") REFERENCES "PdfClientData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
