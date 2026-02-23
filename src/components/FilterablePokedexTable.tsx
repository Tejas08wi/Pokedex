import { useState } from "react";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { trpc } from "../utils/trpc";
import { PokemonTypeSelection } from "./PokemonTypeSelection";
import { PokedexTable } from "./PokedexTable";

export function FilterablePokedexTable() {
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading, isError, error } = trpc.pokemon.getByType.useQuery({
    type: selectedType,
    page,
    pageSize
  });

  const totalPages = data ? Math.max(1, Math.ceil(data.total / pageSize)) : 1;

  return (
    <Box>
      <Stack spacing={2}>
        <PokemonTypeSelection
          selectedType={selectedType}
          selectType={(type) => {
            setSelectedType(type);
            setPage(1);
          }}
        />

        {isLoading && (
          <Typography variant="body2">Loading Pokemon...</Typography>
        )}
        {isError && (
          <Typography color="error" variant="body2">
            {error.message}
          </Typography>
        )}

        {data && (
          <>
            <PokedexTable
              pokemon={data.items}
              emptyMessage="No Pokemon match this filter."
            />
            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, p) => setPage(p)}
                  color="primary"
                  shape="rounded"
                />
              </Box>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
}