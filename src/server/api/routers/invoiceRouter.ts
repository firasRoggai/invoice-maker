import { z } from "zod";
import { authProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { InvoiceObject } from "~/types/types";
// 


export const invoiceRouter = createTRPCRouter({
  get: authProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(InvoiceObject)
    .mutation(async ({ ctx, input }) => {

      // add the database
      const data = await ctx.db.invoice.create({
        data: {
          invoiceData: input, // Store the input as JSON
        },
      });

      return { data };
    }),

  createTemplate: authProcedure
    .input(z.object({
      name: z.string(),
      invoiceObject: InvoiceObject
    }))
    .mutation(async ({ ctx, input }) => {
      const { name, invoiceObject } = input;
      // add the database
      const data = await ctx.db.template.create({
        data: {
          name,
          invoiceData: invoiceObject, // Store the input as JSON
          userId: ctx.user?.id
        },
      });

      return { data };
    }),

  getTemplates: authProcedure
    .input(z.object({
      userId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const data = await ctx.db.template.findMany({
        where: {
          userId: userId,
        }
      });

      return data;
    }),
});
