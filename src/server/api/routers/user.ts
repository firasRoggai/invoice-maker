import { z } from "zod";

import { authProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  sync: authProcedure
    .query(async ({ ctx }) => {
      const user = ctx.sessionClaims;
      
      try {
        await ctx.db.user.create({
          data: {
            id: user?.id,
            name: user?.name ?? "UNKOWN",
            email:  user?.email ||"UNKOWN",
            image: user?.imageUrl || "",
          },
        })
      } catch (error) {
        return {
          error
        }
      }

      return {
        user,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
