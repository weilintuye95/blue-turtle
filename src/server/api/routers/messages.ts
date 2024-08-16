import { asc, eq, type InferSelectModel } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {  messages } from "~/server/db/schema";

export type Message = InferSelectModel<typeof messages>;

export const messagesRouter = createTRPCRouter({
    createMessage: publicProcedure
    .input(z.object({ body: z.string().min(1), sender: z.enum(['user', 'ai']), chatId: z.string().min(1), userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(messages).values({
        sender: input.sender,
        body: input.body,
        chatId: input.chatId,
        userId: input.userId
      })
    }),

  getAllMessages: publicProcedure
    .input(z.object({ chatId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const allMessages: Message[] = await ctx.db
        .select()
        .from(messages)
        .where(eq(messages.chatId, input.chatId))
        .orderBy(asc(messages.createdAt));
      return allMessages
    }),
})