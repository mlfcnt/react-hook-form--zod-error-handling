import { useForm } from "react-hook-form";
import {
  TextInput,
  Button,
  Stack,
  Text,
  Select,
  Checkbox,
} from "@mantine/core";
import { useCreatePokemon } from "../api";
import { ReactNode } from "react";

type FormValues = {
  name: string;
  type: string;
  agreement: boolean;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<FormValues>();
  const { mutate: createPokemon } = useCreatePokemon({
    setFormError: (field: any, options) =>
      setError(field, options, { shouldFocus: true }),
  });

  const onSubmit = handleSubmit((data) => {
    createPokemon({
      name: data.name,
      type: data.type,
      agreement: data.agreement,
    });
  });

  return (
    <div>
      <div style={{ paddingTop: "50px" }}>
        <Text align="center" size={"lg"}>
          Formulaire avec validation faite sur le server
        </Text>
        <Text align="center" size={"md"} italic>
          React hook form / zod / fastify
        </Text>
      </div>
      <Grid>
        <form onSubmit={onSubmit}>
          <h1>Create a new Pokemon</h1>
          <Stack w={500}>
            <TextInput
              {...register("name")}
              placeholder="Bill"
              label="What's its name?"
              withAsterisk
              description="5 characters max"
              error={errors.name?.message}
            />
            <Select
              {...register("type")}
              onChange={(value) => setValue("type", value || "")}
              clearable
              label="What's its type?"
              placeholder="Pick one"
              data={[
                { value: "Normal", label: "Normal" },
                { value: "Fire", label: "Fire" },
                { value: "Water", label: "Water" },
                { value: "Psychic", label: "Psychic" },
              ]}
              error={errors.type?.message}
            />
            <Checkbox
              label="I agree to fight until death for this pokemon"
              {...register("agreement")}
              error={errors.agreement?.message}
            />
            <Button type="submit" w={120}>
              Submit
            </Button>
          </Stack>
        </form>
      </Grid>
    </div>
  );
}

const Grid = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: "grid",
      height: "80vh",
      placeItems: "center",
      margin: 0,
    }}
  >
    {children}
  </div>
);
