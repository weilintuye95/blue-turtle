import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { chats, messages } from "~/server/db/schema";

export const chatRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

  sendMessage: publicProcedure
    .input(z.object({ body: z.string().min(1), sender: z.enum(['user', 'ai']), chatId: z.string().min(1), userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(messages).values({
        sender: input.sender,
        body: input.body,
        chatId: input.chatId,
        userId: input.userId
      });
    }),

  newChat: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(chats).values({
        userId: input.userId,
      });
    }),

//   getLatest: publicProcedure.query(async ({ ctx }) => {
//     const post = await ctx.db.query.posts.findFirst({
//       orderBy: (posts, { desc }) => [desc(posts.createdAt)],
//     });

//     return post ?? null;
//   }),
});
