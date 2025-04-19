import fetch from "node-fetch";

interface Pokemon {
    species: {
        name: string;
        url: string;
    };
}

interface PokemonList {
    count: number;
    next: string;
    previous?: any;
    results: {
        name: string;
        url: string;
    }[];
}

function makeURLFlyweights<ReturnType>(urls: Record<string, string>) {
    const myObject: Record<string, Promise<ReturnType>> = {};

    return new Proxy(myObject, {
        get: (target, name: string) => {
            console.log(`Fetching ${name} ${urls[name]}`);
            if (!target[name]) {
                target[name] = fetch(urls[name]).then((res) => res.json());
            }
            return target[name];
        },
    });
}

(async () => {
    const pokemon = (await (
        await fetch("https://pokeapi.co/api/v2/pokemon/")
    ).json()) as PokemonList;

    console.log('pokemon niz:' ,pokemon)
    console.log('------------------------------------')
    const urls = pokemon.results.reduce(
        (acc, { name, url }) => ({
            ...acc,
            [name]: url,
        }),
        {}
    );

    const lookup = makeURLFlyweights<Pokemon>(urls);
    const data = await lookup.bulbasaur;
    console.log(data.species);

    const data2 = await lookup.venusaur;
    console.log(data2.species);
})();

// pokemon niz: {
//     count: 1304,
//     next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
//     previous: null,
//     results: [
//       { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
//       { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
//       { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
//       { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
//       { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
//       { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
//       { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
//       { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
//       { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
//       { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
//       { name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' },
//       {
//         name: 'butterfree',
//         url: 'https://pokeapi.co/api/v2/pokemon/12/'
//       },
//       { name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
//       { name: 'kakuna', url: 'https://pokeapi.co/api/v2/pokemon/14/' },
//       { name: 'beedrill', url: 'https://pokeapi.co/api/v2/pokemon/15/' },
//       { name: 'pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/' },
//       { name: 'pidgeotto', url: 'https://pokeapi.co/api/v2/pokemon/17/' },
//       { name: 'pidgeot', url: 'https://pokeapi.co/api/v2/pokemon/18/' },
//       { name: 'rattata', url: 'https://pokeapi.co/api/v2/pokemon/19/' },
//       { name: 'raticate', url: 'https://pokeapi.co/api/v2/pokemon/20/' }
//     ]
//   }
//   ------------------------------------
//   Fetching bulbasaur https://pokeapi.co/api/v2/pokemon/1/
//   {
//     name: 'bulbasaur',
//     url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
//   }
//   Fetching venusaur https://pokeapi.co/api/v2/pokemon/3/
//   {
//     name: 'venusaur',
//     url: 'https://pokeapi.co/api/v2/pokemon-species/3/'
//   }