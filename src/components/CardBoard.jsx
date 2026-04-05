import { useState, useEffect, useRef } from 'react';
import Card from './Card.jsx';
import messages from './Messages.jsx';
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

function CardBoard({ incrementScore }) {
  const [gameReady, setGameReady] = useState(false);
  const [gameMessage, setGameMessage] = useState(
    'Cards are loading, please wait'
  );
  const [arrayOfCards, setArrayOfCards] = useState([]);
  const cardsClicked = useRef([]);
  const numberOfCardsToDisplay = 10;

  function isCardClickedOnce(cardId) {
    if (cardsClicked.current.includes(cardId)) {
      cardsClicked.current = [];
      incrementScore(-1);
      setGameMessage(`Oh dear, you messed up! Try again.`);
    } else {
      const newArray = [...cardsClicked.current];
      newArray.push(cardId);
      cardsClicked.current = [...newArray];
      incrementScore(1);
      setGameMessage(() => {
        const randomIndex = Math.floor(Math.random() * (messages.length - 1));
        return messages[randomIndex];
      });
      setArrayOfCards((prev) => {
        return shuffleArray(prev);
      });
    }
  }

  function handleCardClick(cardId) {
    isCardClickedOnce(cardId);
  }

  useEffect(() => {
    (async () => {
      const api = new PokemonClient();

      const data = await api.listPokemons();
      const listOfDataObjects = [...shuffleArray(data.results)];
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
        for (let index = 0; index < data.length; index++) {
          const pokemonObject = data[index];
          newArrayOfCards.push(
            <Card
              cardId={pokemonObject.id}
              cardName={pokemonObject.name}
              cardUrl={pokemonObject.spriteUrl}
              handleCardClick={handleCardClick}
            />
          );
        }
        setArrayOfCards(newArrayOfCards);
        setGameMessage('Click on a card only ONCE!');
        setGameReady(true);
      });
    })();

    return () => {
      return;
    };
  }, []);

  return gameReady ? (
    <main>
      <h1>{gameMessage}</h1>
      <ul className="card-container">
        {arrayOfCards.slice(0, numberOfCardsToDisplay).map((element, index) => {
          return <li key={index}>{element}</li>;
        })}
      </ul>
    </main>
  ) : (
    <main>
      <h1>{gameMessage}</h1>
    </main>
  );
}

export default CardBoard;
