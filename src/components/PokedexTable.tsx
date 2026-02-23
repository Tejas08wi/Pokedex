import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
  } from "@mui/material";
  import type { Pokemon } from "../server/api/routers/pokemon";
  import { PokemonRow } from "./PokemonRow";
  
  export type PokedexTableProps = {
    pokemon: Pokemon[];
    emptyMessage?: string;
  };
  
  export function PokedexTable({ pokemon, emptyMessage }: PokedexTableProps) {
    if (pokemon.length === 0) {
      return (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {emptyMessage ?? "No Pokemon to display."}
        </Typography>
      );
    }
  
    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Types</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemon.map((p) => (
              <PokemonRow key={p.id} pokemon={p} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }