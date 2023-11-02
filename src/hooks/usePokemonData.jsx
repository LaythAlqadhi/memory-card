import { useState, useEffect } from 'react';

const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon';

export default function usePokemonData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const result = await response.json();
        
        const pokemonDetails = await Promise.all(
          result.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            return {
              id: pokemonData.id,
              name: pokemon.name,
              url: pokemonData.sprites.other['dream_world'].front_default,
              details: pokemonData
            };
          })
        );

        setData(pokemonDetails);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}