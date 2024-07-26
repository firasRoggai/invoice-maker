import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { InvoiceObject } from "~/types";
// 


export const invoiceRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(InvoiceObject)
    .mutation(async ({ ctx, input }) => {

      // const pdfStream = await ReactPDF.renderToBuffer(<Document>
      //   <Page>
      //     {/* top section */}
      //     <View>
      //       <Text style={{ paddingRight: "10px" }}>TESTING</Text>
      //     </View>
      //   </Page>
      // </Document>);

      // add the database
      const data = await ctx.db.invoice.create({
        data: {
          invoiceData: input, // Store the input as JSON
        },
      });

      return { data };
    }),
});
