import fastify from "fastify";
import cors from "@fastify/cors";
import z from "zod";
import { validateDataOrSendError } from "./lib";

const server = fastify();
server.register(cors);

server.post("/pokemon/new", async (request, reply) => {
  const pokemonSchema = z.object({
    name: z
      .string()
      .min(1, {
        message: "You have to give it a name!",
      })
      .max(5),
    type: z.string().min(1, { message: "Please pick a type" }),
    agreement: z.boolean().refine((v) => v === true, {
      message: "You must agree to this, sorry",
    }),
  });

  validateDataOrSendError(pokemonSchema, request.body, reply);
  reply.send(`New pokemon created`);
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
