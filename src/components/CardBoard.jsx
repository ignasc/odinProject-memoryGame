import { useState, useEffect, useRef } from 'react';
import Card from './Card.jsx';
import { PokemonClient } from 'pokenode-ts';

function shuffleArray(array) {
  let shuffeledArray = [...array];
  for (let i = shuffeledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = shuffeledArray[i];
    shuffeledArray[i] = shuffeledArray[j];
    shuffeledArray[j] = k;
  }
  return shuffeledArray;
}

function CardBoard({ incrementScore, setBestScore, resetScore }) {
  const [gameReady, setGameReady] = useState(false);
  const [gameMessage, setGameMessage] = useState(
    'Cards are loading, please wait'
  );
  const [arrayOfCards, setArrayOfCards] = useState([]);
  const cardsClicked = useRef([]);
  const arrayOfPokemons = [];
  const numberOfCardsToDisplay = 10;

  function isCardClickedOnce(cardId) {
    if (cardsClicked.current.includes(cardId)) {
      // console.log(`Card ${cardId} clicked more than once.`);
      cardsClicked.current = [];
      incrementScore(-1);
    } else {
      // console.log(`Card ${cardId} clicked once`);
      const newArray = [...cardsClicked.current];
      newArray.push(cardId);
      cardsClicked.current = [...newArray];
      incrementScore(1);
    }
  }

  function handleCardClick(cardId) {
    isCardClickedOnce(cardId);
    // console.log(`card was clicked with id ${cardId}`);
  }

  useEffect(() => {
    (async () => {
      const api = new PokemonClient();

      const data = await api.listPokemons();
      const listOfDataObjects = [
        ...shuffleArray(data.results).slice(0, numberOfCardsToDisplay),
      ];
      // console.log(listOfDataObjects)
      const newArrayOfCards = [];
      await Promise.all(
        listOfDataObjects.map(async (pokemon) => {
          const newPokemon = await api.getPokemonByName(pokemon.name);

          return {
            id: newPokemon.id,
            name: newPokemon.name,
            spriteUrl: newPokemon.sprites.front_default,
          };
        })
      ).then((data) => {
        // console.log('All promises resolved, data below:');
        // console.log(data);
        for (let index = 0; index < data.length; index++) {
          const pokemonObject = data[index];
          // console.log(`card url: ${pokemonObject.spriteUrl}`)
          newArrayOfCards.push(
            <Card
              incrementScore={incrementScore}
              resetScore={resetScore}
              cardId={pokemonObject.id}
              cardName={pokemonObject.name}
              cardUrl={pokemonObject.spriteUrl}
              handleCardClick={handleCardClick}
            />
          );
        }
        // console.log(newArrayOfCards);
        setArrayOfCards(newArrayOfCards);
        setGameReady(true);
      });
    })();

    return () => {
      return;
    };
  }, []);

  return gameReady ? (
    <main>
      <ul className="card-container">
        {arrayOfCards.map((element, index) => {
          return <li key={index}>{element}</li>;
        })}
      </ul>
    </main>
  ) : (
    <main>{gameMessage}</main>
  );
}

export default CardBoard;
