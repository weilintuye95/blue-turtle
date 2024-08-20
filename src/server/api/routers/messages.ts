import { observable } from "@trpc/server/observable";
import { asc, eq, type InferSelectModel } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure, t } from "~/server/api/trpc";
import {  messages } from "~/server/db/schema";
import { EventEmitter } from 'events';

export type Message = InferSelectModel<typeof messages>;

const ee = new EventEmitter();

export const messagesRouter = createTRPCRouter({
    // onMessage: publicProcedure.subscription(() => {
    //   return observable<Message>((emit) => {
    //     const onMessage = (data: Message) => {
    //       emit.next(data);
    //       console.log('Weirdllama-messages.ts')
    //     };
    //     // ee.on('createMessage', onMessage);
    //     ee.on('createMessage', (data) => {
    //       console.log('createMessage event emitted:', data);
    //     });
    //     return () => {
    //       ee.off('createMessage', onMessage);
    //     };
    //   })
    // }),

    createMessage: publicProcedure
    .input(z.object({ body: z.string().min(1), sender: z.enum(['user', 'ai']), chatId: z.string().min(1), userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(messages).values({
        sender: input.sender,
        body: input.body,
        chatId: input.chatId,
        userId: input.userId
      })
      ee.emit('createMessage', {
        body: input.body,
        sender: input.sender,
        chatId: input.chatId,
        userId: input.userId
      })
      console.log('createMessage emitted!')
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


  randomNumber: publicProcedure.subscription(() => {
    return observable<{ randomNumber: number }>((emit) => {
      const timer = setInterval(() => {
        // emits a number every second
        emit.next({ randomNumber: Math.random() });
      }, 5000);

      return () => {
        clearInterval(timer);
      };
    });
  }),

  onMessage: publicProcedure.subscription(() => {
    return observable<Message>((emit) => {

      // const onMessage = (data: Message) => {
      //   console.log('Received message:', data);
      //   emit.next(data);
      // };
      const onMessage = () => {
        console.log(emit.next({ id: 'some-id',
              createdAt: new Date(),
              body: 'Hello, World!',
              sender: 'ai',
              chatId: '1',
              userId: '1' }))

      };
      ee.on('createMessage', onMessage);
      console.log('Event listener added: createMessage')
      // const timer = setInterval(() => {
      //   // emits a number every second
      //   emit.next({ id: 'some-id',
      //     createdAt: new Date(),
      //     body: 'Hello, World!',
      //     sender: 'ai',
      //     chatId: '1',
      //     userId: '1' });
      // }, 500);
      return () => {
        ee.off('createMessage', onMessage);
        console.log('Event listener removed: createMessage')
      };
    })
  }),
})