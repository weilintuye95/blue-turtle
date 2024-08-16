import { desc, eq, type InferSelectModel } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { chats } from "~/server/db/schema";

export type Chat = InferSelectModel<typeof chats>;

export const chatRouter = createTRPCRouter({
  createChat: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const newChat = await ctx.db.insert(chats).values({
        userId: input.userId,
      }).returning();
      return newChat[0]
    }),

  getChat:publicProcedure
    .input(z.object({ chatId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const [chat] = await ctx.db
        .select()
        .from(chats)
        .where(eq(chats.id, input.chatId));
      return chat;
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
