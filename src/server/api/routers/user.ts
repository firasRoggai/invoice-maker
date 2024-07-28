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
});
