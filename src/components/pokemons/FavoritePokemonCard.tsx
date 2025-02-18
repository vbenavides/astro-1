import type { FavoritePokemon } from '@interfaces/favorite-pokemons';
import { createSignal, Show, type Component } from 'solid-js';

interface Props {
  pokemon: FavoritePokemon;
}

export const FavoritePokemonCard: Component<Props> = ({ pokemon }) => {
  const [isVisible, setIsVisible] = createSignal(true);

  const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const deleteFavoritePokemon = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]');

    const newFavorites = favorites.filter(
      (favorite: FavoritePokemon) => favorite.id !== pokemon.id
    );

    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    setIsVisible(false);
  };

  return (
    <Show when={isVisible()}>
      <div class='flex flex-col items-center justify-center'>
        <a href={`/pokemons/${pokemon.name}`}>
          <img
            src={imageSrc}
            alt={pokemon.name}
            width={96}
            height={96}
            style={`view-transition-name: ${pokemon.name}-image`}
          />
          <p class='capitalize'>
            #{pokemon.id} {pokemon.name}
          </p>
        </a>
        <button onClick={deleteFavoritePokemon} class='text-red-400'>
          Borrar
        </button>
      </div>
    </Show>
  );
};
