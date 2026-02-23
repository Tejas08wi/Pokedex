import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { trpc } from "../src/utils/trpc";
import { PokedexTable } from "../src/components/PokedexTable";

function parseNames(input: string): string[] {
  return input
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function Part2Page() {
  const [rawInput, setRawInput] = useState("Bulbasaur, Charmander, Squirtle");
  const [submittedNames, setSubmittedNames] = useState<string[] | null>(null);

  const query = trpc.pokemon.getManyByNames.useQuery(submittedNames ?? [], {
    enabled: submittedNames !== null && submittedNames.length > 0
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const names = parseNames(rawInput);
    setSubmittedNames(names);
  };

  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom>
        Part 2 – Fetch multiple Pokemon
      </Typography>

      <Box component="form" onSubmit={handleSubmit} mt={2}>
        <Stack spacing={2}>
          <TextField
            label="Pokemon names (comma or newline separated)"
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            multiline
            minRows={3}
          />
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Stack>
      </Box>

      {query.isLoading && (
        <Typography variant="body2" mt={2}>
          Loading...
        </Typography>
      )}
      {query.isError && (
        <Typography variant="body2" mt={2} color="error">
          {query.error.message}
        </Typography>
      )}

      {query.data && (
        <PokedexTable
          pokemon={query.data}
          emptyMessage="No Pokemon found for the provided names."
        />
      )}
    </Box>
  );
}