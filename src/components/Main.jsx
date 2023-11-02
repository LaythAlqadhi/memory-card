import { useState, useEffect } from 'react';
import usePokemonData from '/src/hooks/usePokemonData';
import shuffleArray from '/src/utils/shuffleArray';
import Card from './Card';
import Loading from './Loading';
import '../styles/Main.css';

export default function Main() {
  const [pokemonData, setPokemonData] = useState(null);
  const { data, loading, error } = usePokemonData();
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pickedPokemon, setPickedPokemon] = useState(new Set());
  const [shuffleEffect, setShuffleEffect] = useState(false);
  
  function updatePokemonData() {
    const shuffledData = [...data];
    shuffleArray(shuffledData);
    setPokemonData(shuffledData);
  }
  
  useEffect(() => {
    if (data && !loading) {
      updatePokemonData();
    }
  }, [data, loading]);
                                    
  function handleClick(e) {
    setShuffleEffect(true);
    
    if (!pickedPokemon.has(e.target.src)) {
      pickedPokemon.add(e.target.src);
      setCurrentScore(currentScore + 1);
    } else {
      setPickedPokemon(new Set());
      setCurrentScore(0);
    }
    
    setTimeout(() => {
      updatePokemonData();
      setShuffleEffect(false);
    }, 750);
  }

  if (currentScore > bestScore) {
    setBestScore(currentScore);
  }
  
  return (
    <main>
      {pokemonData ? (
        <>
          <div className="scoreboard">
            <p className="current-score">Current score: {currentScore}</p>
            <p className="best-score">Best score: {bestScore}</p>
          </div>
          <div className="cards-container">
            {(() => {
              const elements = [];
              for (let i = 0; i < 6; i++) {
                elements.push(
                  <Card
                    key={i}
                    imgSrc={pokemonData[i].url}
                    name={pokemonData[i].name}
                    onClick={handleClick}
                    className={shuffleEffect ? 'card-inner shuffle' : 'card-inner'}
                  />
                );
              }
              return elements;
            })()}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
}