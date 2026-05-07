import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { bookingRouter } from "./routers/booking";
import { followupRouter } from "./routers/followup";
import { capiRouter } from "./routers/capi";
import { leadsRouter } from "./routers/leads";
import { filesRouter } from "./routers/files";
import { postsRouter } from "./routers/posts";
import { subscribersRouter } from "./routers/subscribers";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  booking: bookingRouter,
  followup: followupRouter,
  capi: capiRouter,
  leads: leadsRouter,
  files: filesRouter,
  posts: postsRouter,
  subscribers: subscribersRouter,
});

export type AppRouter = typeof appRouter;
