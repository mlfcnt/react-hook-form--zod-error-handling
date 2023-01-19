import { FastifyReply } from "fastify";
import { z } from "zod";

export const validateDataOrSendError = <T>(
  schema: z.Schema<T>,
  data: T,
  reply: FastifyReply
) => {
  const validation = schema.safeParse(data);
  if (!validation.success) {
    reply.code(500).send({ validationError: validation.error });
  }
};
