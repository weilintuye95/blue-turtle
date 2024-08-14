import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

import { type InferSelectModel } from 'drizzle-orm'
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';


export type User = InferSelectModel<typeof users>;

export const userRouter = createTRPCRouter({
  createOrReturnUser: publicProcedure
    .input(z.object({ username: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // Check if the username already exists
      const existingUser: User | undefined = await ctx.db.query.users.findFirst({
        where: eq(users.username, input.username),
      });

      // If the user exists, return it
      if (existingUser) {
        return existingUser;
      }
      console.log('user does not exist, creating new user')
      // If the user doesn't exist, create it and return the new record
      const newUser = await ctx.db
        .insert(users)
        .values({ username: input.username })
        .returning();

      console.log(newUser)
      if (!newUser.length) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create user',
        });
      }

      return newUser[0]; // Return the created user
    }),
});

