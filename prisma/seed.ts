import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const pokemonData = [
    {
      name: "Bulbasaur",
      typesCsv: "grass,poison",
      sprite: "https://pokemon.com/pictures/bulbasaur.png"
    },
    {
      name: "Ivysaur",
      typesCsv: "grass,poison",
      sprite: "https://pokemon.com/pictures/ivysaur.png"
    },
    {
      name: "Venusaur",
      typesCsv: "grass,poison",
      sprite: "https://pokemon.com/pictures/venusaur.png"
    },
    {
      name: "Charmander",
      typesCsv: "fire",
      sprite: "https://pokemon.com/pictures/charmander.png"
    },
    {
      name: "Charmeleon",
      typesCsv: "fire",
      sprite: "https://pokemon.com/pictures/charmeleon.png"
    },
    {
      name: "Charizard",
      typesCsv: "fire,flying",
      sprite: "https://pokemon.com/pictures/charizard.png"
    },
    {
      name: "Squirtle",
      typesCsv: "water",
      sprite: "https://pokemon.com/pictures/squirtle.png"
    },
    {
      name: "Wartortle",
      typesCsv: "water",
      sprite: "https://pokemon.com/pictures/wartortle.png"
    },
    {
      name: "Blastoise",
      typesCsv: "water",
      sprite: "https://pokemon.com/pictures/blastoise.png"
    }
  ];

  for (const p of pokemonData) {
    await prisma.pokemon.upsert({
      where: { name: p.name },
      update: p,
      create: p
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });