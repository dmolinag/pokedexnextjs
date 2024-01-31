'use client';

import { PokemonObj } from '../../../types/Pokemon';
import { getPokemonColor } from '../../../utils/pokemonFunctions';
import { getFavoritePokemons, setFavoritePokemons } from '../../../utils';
import { INITIAL_POKEMON } from '../../../customHooks';
import { useState } from 'react';
import { Card, CardContent } from '../../../components';
import _ from 'lodash';
import { PokemonModal } from '@/components/pokemonDetailsModal/pokemonDetailsModal';
import { PokemonTypeModal } from '@/components/pokemonTypeModal/PokemonTypeModal';

interface PokemonCardProp {
	pokemon: PokemonObj;
}

export const PokemonCard = ({ pokemon }: PokemonCardProp) => {
	const [isPokemonDetailsModalOpen, setIsPokemonDetailsModalOpen] =
		useState<boolean>(false);
	const [isPokemonTypeModalOpen, setIsPokemonTypeModalOpen] =
		useState<boolean>(false);
	const [selectedPokemon, setSelectedPokemon] =
		useState<PokemonObj>(INITIAL_POKEMON);
	const [favPokemons, setFavPokemons] = useState<number[]>(getFavoritePokemons);
	const [pokemonTypeAgainst, setPokemonTypeAgainst] = useState<string>('');

	const handleOpenPokemonDetailsModal = (pokemon: PokemonObj) => {
		setIsPokemonDetailsModalOpen(true);
		setSelectedPokemon(pokemon);
	};
	const handleOpenPokemonTypeModal = (type: string) => {
		setIsPokemonTypeModalOpen(true);
		setPokemonTypeAgainst(type);
	};

	const handleSetFavorite = (pokemonId: number) => {
		setFavPokemons((prevState) => prevState.concat(pokemonId));
		setFavoritePokemons([...favPokemons, pokemonId]);
	};

	const handleRemoveFavorite = (pokemonId: number) => {
		const savedPokemon = favPokemons.filter(
			(savedPokemon: number) => savedPokemon === pokemonId
		);

		if (savedPokemon.length > 0) {
			const newArray = [...favPokemons];
			_.remove(newArray, (n) => {
				return n === savedPokemon[0];
			});
			setFavPokemons(newArray);
			setFavoritePokemons(newArray);
		}
	};

	return (
		<>
			<Card
				size='md'
				backgroundColor={getPokemonColor(pokemon).color}
				key={pokemon.id}
			>
				<CardContent
					type='vertical'
					pokemon={pokemon}
					openModal={() => handleOpenPokemonDetailsModal(pokemon)}
					favPokemons={favPokemons}
					onSetFavorites={handleSetFavorite}
					onRemoveFavorites={handleRemoveFavorite}
					openPokemonTypeModal={handleOpenPokemonTypeModal}
				/>
			</Card>

			<PokemonModal
				pokemon={selectedPokemon}
				isOpen={isPokemonDetailsModalOpen}
				setOpen={() => setIsPokemonDetailsModalOpen(false)}
			/>

			<PokemonTypeModal
				type={pokemonTypeAgainst}
				isOpen={isPokemonTypeModalOpen}
				setOpen={() => setIsPokemonTypeModalOpen(false)}
			/>
		</>
	);
};
