import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { prisma } from "../../db";

type PokemonRecord = Awaited<ReturnType<typeof prisma.pokemon.findMany>>[number];

const pokemonShape = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(z.string()),
  sprite: z.string().url()
});

export type Pokemon = z.infer<typeof pokemonShape>;

function csvToTypes(csv: string): string[] {
  return csv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export const pokemonRouter = router({
  getByName: publicProcedure
    .input(z.string().min(1))
    .output(pokemonShape)
    .query(async ({ input }) => {
      const found = await prisma.pokemon.findUnique({
        where: { name: input }
      });

      if (!found) {
        throw new Error(`Pokemon with name "${input}" not found`);
      }

      return {
        id: found.id,
        name: found.name,
        types: csvToTypes(found.typesCsv),
        sprite: found.sprite
      };
    }),

  getManyByNames: publicProcedure
    .input(z.array(z.string().min(1)))
    .output(z.array(pokemonShape))
    .query(async ({ input }) => {
      const found = await prisma.pokemon.findMany({
        where: {
          name: {
            in: input
          }
        },
        orderBy: { id: "asc" }
      });

      return found.map((p: PokemonRecord) => ({
        id: p.id,
        name: p.name,
        types: csvToTypes(p.typesCsv),
        sprite: p.sprite
      }));
    }),

  getByType: publicProcedure
    .input(
      z.object({
        type: z.string().min(1).optional(),
        page: z.number().int().min(1).default(1),
        pageSize: z.number().int().min(1).max(50).default(10)
      })
    )
    .output(
      z.object({
        items: z.array(pokemonShape),
        total: z.number()
      })
    )
    .query(async ({ input }) => {
      const { type, page, pageSize } = input;
      const where = type
        ? {
            OR: [
              { typesCsv: { startsWith: `${type},` } },
              { typesCsv: { endsWith: `,${type}` } },
              { typesCsv: { contains: `,${type},` } },
              { typesCsv: type }
            ]
          }
        : {};

      const [total, rows] = await Promise.all([
        prisma.pokemon.count({ where }),
        prisma.pokemon.findMany({
          where,
          orderBy: { id: "asc" },
          skip: (page - 1) * pageSize,
          take: pageSize
        })
      ]);

      return {
        total,
        items: rows.map((p: PokemonRecord) => ({
          id: p.id,
          name: p.name,
          types: csvToTypes(p.typesCsv),
          sprite: p.sprite
        }))
      };
    })
});