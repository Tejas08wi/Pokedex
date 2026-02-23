import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Pokedex with Next.js, tRPC & Prisma
      </Typography>
      <Typography variant="body1" gutterBottom>
        Choose a part to explore:
      </Typography>
      <Stack spacing={2} mt={2}>
        <Button component={Link} href="/part1" variant="contained">
          Part 1 - Single Pokemon
        </Button>
        <Button component={Link} href="/part2" variant="contained">
          Part 2 - Multiple Pokemon
        </Button>
        <Button component={Link} href="/part3" variant="contained">
          Part 3 - Filterable Pokedex
        </Button>
      </Stack>
    </Box>
  );
}