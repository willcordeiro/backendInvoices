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

-- CreateTable
CREATE TABLE "EnergiaCompensada" (
    "id" SERIAL NOT NULL,
    "unidade" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "precoUnit" TEXT NOT NULL,
    "valorTotal" TEXT NOT NULL,
    "pisCofins" TEXT,
    "icms" TEXT,
    "tarifaUnit" TEXT,
    "pdfClientDataId" INTEGER NOT NULL,

    CONSTRAINT "EnergiaCompensada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContribuicaoIlumPublica" (
    "id" SERIAL NOT NULL,
    "unidade" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "valorTotal" TEXT NOT NULL,
    "pdfClientDataId" INTEGER NOT NULL,

    CONSTRAINT "ContribuicaoIlumPublica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Total" (
    "id" SERIAL NOT NULL,
    "unidade" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "valorTotal" TEXT NOT NULL,
    "pdfClientDataId" INTEGER NOT NULL,

    CONSTRAINT "Total_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BandeiraVermelha" (
    "id" SERIAL NOT NULL,
    "unidade" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "valorTotal" TEXT NOT NULL,
    "pdfClientDataId" INTEGER NOT NULL,

    CONSTRAINT "BandeiraVermelha_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EnergiaCompensada_pdfClientDataId_key" ON "EnergiaCompensada"("pdfClientDataId");

-- CreateIndex
CREATE UNIQUE INDEX "ContribuicaoIlumPublica_pdfClientDataId_key" ON "ContribuicaoIlumPublica"("pdfClientDataId");

-- CreateIndex
CREATE UNIQUE INDEX "Total_pdfClientDataId_key" ON "Total"("pdfClientDataId");

-- CreateIndex
CREATE UNIQUE INDEX "BandeiraVermelha_pdfClientDataId_key" ON "BandeiraVermelha"("pdfClientDataId");

-- AddForeignKey
ALTER TABLE "ValoresFaturados" ADD CONSTRAINT "ValoresFaturados_pdfClientDataId_fkey" FOREIGN KEY ("pdfClientDataId") REFERENCES "PdfClientData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnergiaCompensada" ADD CONSTRAINT "EnergiaCompensada_pdfClientDataId_fkey" FOREIGN KEY ("pdfClientDataId") REFERENCES "PdfClientData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContribuicaoIlumPublica" ADD CONSTRAINT "ContribuicaoIlumPublica_pdfClientDataId_fkey" FOREIGN KEY ("pdfClientDataId") REFERENCES "PdfClientData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Total" ADD CONSTRAINT "Total_pdfClientDataId_fkey" FOREIGN KEY ("pdfClientDataId") REFERENCES "PdfClientData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BandeiraVermelha" ADD CONSTRAINT "BandeiraVermelha_pdfClientDataId_fkey" FOREIGN KEY ("pdfClientDataId") REFERENCES "PdfClientData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
