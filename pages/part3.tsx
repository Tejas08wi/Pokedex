import { Box, Typography } from "@mui/material";
import { FilterablePokedexTable } from "../src/components/FilterablePokedexTable";

export default function Part3Page() {
  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom>
        Part 3 – Filterable Pokedex by Type
      </Typography>
      <Typography variant="body1" gutterBottom>
        Choose a Pokemon type to filter the table. Data is fetched via tRPC and
        Prisma with simple pagination.
      </Typography>
      <Box mt={3}>
        <FilterablePokedexTable />
      </Box>
    </Box>
  );
}