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
});
