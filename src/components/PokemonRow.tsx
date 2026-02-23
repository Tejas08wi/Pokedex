import { TableRow, TableCell, Avatar, Stack, Chip } from "@mui/material";
import type { Pokemon } from "../server/api/routers/pokemon";

export type PokemonRowProps = {
  pokemon: Pokemon;
};

export function PokemonRow({ pokemon }: PokemonRowProps) {
  return (
    <TableRow hover>
      <TableCell>{pokemon.id}</TableCell>
      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={pokemon.sprite}
            alt={pokemon.name}
            variant="rounded"
            sx={{ width: 48, height: 48 }}
          />
          {pokemon.name}
        </Stack>
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {pokemon.types.map((t) => (
            <Chip key={t} label={t} size="small" color="secondary" />
          ))}
        </Stack>
      </TableCell>
    </TableRow>
  );
}