import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { mockPdfs, mockClientDataValues } from "./e2e/mock.pdf";

jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => ({
            pdfClientData: {
                findMany: jest.fn().mockResolvedValue(mockPdfs),
                findFirst: jest
                    .fn()
                    .mockImplementationOnce(() => Promise.resolve(undefined))
                    .mockImplementationOnce(() => Promise.resolve(mockClientDataValues)),
                create: jest
                    .fn()
                    .mockImplementationOnce(() => Promise.resolve(mockClientDataValues)),
            },
        })),
    };
});

export const prismaMock = mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
    mockReset(prismaMock);
});

export const getPrismaMock = () => prismaMock;
