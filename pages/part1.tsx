import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { trpc } from "../src/utils/trpc";
import { PokemonRow } from "../src/components/PokemonRow";

export default function Part1Page() {
  const [name, setName] = useState("Bulbasaur");
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const query = trpc.pokemon.getByName.useQuery(submittedName ?? "", {
    enabled: submittedName !== null
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedName(name.trim());
  };

  const pokemon = query.data;

  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom>
        Part 1 – Fetch a single Pokemon
      </Typography>

      <Box component="form" onSubmit={handleSubmit} mt={2}>
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
          <TextField
            label="Pokemon name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
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

      {pokemon && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Types</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <PokemonRow pokemon={pokemon} />
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}