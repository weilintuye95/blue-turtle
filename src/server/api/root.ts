import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { chatRouter as chatsRouter } from "./routers/chat";
import { userRouter as usersRouter } from "./routers/user";
import { messagesRouter } from "./routers/messages";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: usersRouter,
  chat: chatsRouter,
  message: messagesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
