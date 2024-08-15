import { desc, eq, type InferSelectModel } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { chats, messages } from "~/server/db/schema";

export type Chat = InferSelectModel<typeof chats>;


export const chatRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(z.object({ body: z.string().min(1), sender: z.enum(['user', 'ai']), chatId: z.string().min(1), userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(messages).values({
        sender: input.sender,
        body: input.body,
        chatId: input.chatId,
        userId: input.userId
      })
    }),

  newChat: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const newChat = await ctx.db.insert(chats).values({
        userId: input.userId,
      }).returning();
      return newChat[0]
    }),

  getAllChats: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const userChats: Chat[] = await ctx.db
        .select()
        .from(chats)
        .where(eq(chats.userId, input.userId))
        .orderBy(desc(chats.createdAt));
      return userChats
    }),
});
