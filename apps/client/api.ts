import { useMutation } from "react-query";
import { z } from "zod";
import wretch from "wretch";
import { UseFormSetError } from "react-hook-form";
import { handleFormValidationError } from "./lib";

// doublon avec le server
const pokemonSchema = z.object({
  name: z.string().min(2).max(5),
  type: z.string().min(1),
  agreement: z.boolean().refine((v) => v === true),
});
type Pokemon = z.infer<typeof pokemonSchema>;

const api = wretch("http://localhost:8080/pokemon").errorType("json");

const createPokemon = async (pokemon: Pokemon) =>
  await api.url("/new").post(pokemon).json();

export const useCreatePokemon = ({
  setFormError,
}: {
  setFormError: UseFormSetError<any>;
}) =>
  useMutation(createPokemon, {
    onError: (error: any) => {
      handleFormValidationError(error, setFormError);
      throw error;
    },
  });
