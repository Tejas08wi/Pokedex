import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import type { inferAsyncReturnType } from "@trpc/server";
import type { NextApiRequest, NextApiResponse } from "next";

export function createContext(opts: { req: NextApiRequest; res: NextApiResponse }) {
  return {
    req: opts.req,
    res: opts.res
  };
}

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    };
  }
});

export const router = t.router;
export const publicProcedure = t.procedure;