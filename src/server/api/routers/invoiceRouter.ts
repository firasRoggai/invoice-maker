import { z } from "zod";
import { authProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { InvoiceObject } from "~/types/types";
// 


export const invoiceRouter = createTRPCRouter({
  create: authProcedure
    .input(z.object(
      {
        from: z.string(),
        to: z.string(),
        balance_due: z.number(),
        currency: z.string(),
        invoiceData: InvoiceObject,
      }
    ))
    .mutation(async ({ ctx, input }) => {
      const { from, to, balance_due, currency, invoiceData } = input;
      const { sessionClaims } = ctx;

      // add the database
      const data = await ctx.db.invoice.create({
        data: {
          from,
          to,
          balance_due,
          currency,
          invoiceData,
          userId: sessionClaims?.id,
        },
      });

      return { data };
    }),
  getinvoices: authProcedure
    .input(z.object({
      userId: z.string(),
    }))
    .query(async ({ ctx }) => {
      const { sessionClaims } = ctx;

      const data = await ctx.db.invoice.findMany({
        where: {
          userId: sessionClaims?.id,
        }
      });

      return data;
    }),

  getinvoiceById: authProcedure
    .input(z.object({
      invoiceId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { invoiceId } = input;
      const { user } = ctx;

      const data = await ctx.db.invoice.findFirst({
        where: {
          id: invoiceId,
          userId: user?.id
        }
      });

      return data;
    }),
  deleteinvoiceById: authProcedure
    .input(z.object({
      invoiceId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { invoiceId } = input;
      const { user } = ctx;

      const data = await ctx.db.invoice.delete({
        where: {
          id: invoiceId,
          userId: user?.id
        }
      });

      return data;
    }),

  createTemplate: authProcedure
    .input(z.object({
      name: z.string(),
      invoiceObject: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const { name, invoiceObject } = input;
      // add the database
      const data = await ctx.db.template.create({
        data: {
          name,
          invoiceData: JSON.parse(invoiceObject), // Store the input as JSON
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
  getTemplateById: authProcedure
    .input(z.object({
      templateId: z.number(),
    }))
    .query(async ({ ctx, input }) => {
      const { templateId } = input;
      const { user } = ctx;

      const data = await ctx.db.template.findFirst({
        where: {
          id: templateId,
          userId: user?.id
        }
      });

      return data;
    }),
  deleteTemplateById: authProcedure
    .input(z.object({
      templateId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { templateId } = input;
      const { user } = ctx;

      const data = await ctx.db.template.delete({
        where: {
          id: templateId,
          userId: user?.id
        }
      });

      return data;
    }),
});
