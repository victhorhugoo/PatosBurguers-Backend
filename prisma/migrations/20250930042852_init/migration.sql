-- CreateTable
CREATE TABLE "public"."respostasDelivery" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "avaliacao1" TEXT NOT NULL,
    "avaliacao2" TEXT NOT NULL,
    "avaliacao3" TEXT NOT NULL,
    "avaliacao4" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brindeResgatado" TIMESTAMP(3),

    CONSTRAINT "respostasDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."respostasSalao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "avaliacao1" TEXT NOT NULL,
    "avaliacao2" TEXT NOT NULL,
    "avaliacao3" TEXT NOT NULL,
    "avaliacao4" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brindeResgatado" TIMESTAMP(3),

    CONSTRAINT "respostasSalao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "respostasDelivery_email_key" ON "public"."respostasDelivery"("email");

-- CreateIndex
CREATE UNIQUE INDEX "respostasSalao_email_key" ON "public"."respostasSalao"("email");
