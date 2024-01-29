'use client';

// import { PokemonObj } from '../../../types/Pokemon';
import styles from './pokemonList.module.scss';
import { useState } from 'react';
import _ from 'lodash';
import { Button, Card, CardContent } from '..';
import {
	INITIAL_POKEMON,
	useListPokemon,
	useListPokemonByType,
} from '@/customHooks';
import {
	POKEMONS_PER_PAGE,
	getFavoritePokemons,
	getPokemonColor,
	setFavoritePokemons,
	usePokemonsListContext,
} from '@/utils';
import { PokemonObj } from '@/types/Pokemon';
// import { PokemonTypeModal } from '../../../components/pokemonTypeModal/PokemonTypeModal';

interface PokemonListProp {
	page: number;
	handlePage: (page: number) => void;
}

export const PokemonList = ({ page, handlePage }: PokemonListProp) => {
	const { pokemonList, filtered, pokemonType } = usePokemonsListContext();
	const { queryPokemons } = useListPokemon();
	const { queryPokemonsByType } = useListPokemonByType();

	const [isPokemonDetailsModalOpen, setIsPokemonDetailsModalOpen] =
		useState<boolean>(false);
	const [isPokemonTypeModalOpen, setIsPokemonTypeModalOpen] =
		useState<boolean>(false);
	const [selectedPokemon, setSelectedPokemon] =
		useState<PokemonObj>(INITIAL_POKEMON);
	const [favPokemons, setFavPokemons] = useState<number[]>(getFavoritePokemons);
	const [pokemonTypeAgainst, setPokemonTypeAgainst] = useState<string>('');

	const handleLoadMore = async () => {
		const nextPage = page + 1;

		if (!filtered) {
			queryPokemons(page);
		} else {
			queryPokemonsByType(pokemonType, POKEMONS_PER_PAGE * nextPage);
		}
		handlePage(nextPage);
	};

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
		<section className={styles.pokemonList}>
			<div className={styles.pokemonList__list}>
				{pokemonList.map((pokemon: PokemonObj) => {
					return (
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
					);
				})}
			</div>

			{/* <PokemonModal
				pokemon={selectedPokemon}
				isOpen={isPokemonDetailsModalOpen}
				setOpen={() => setIsPokemonDetailsModalOpen(false)}
			/> */}

			{/* <PokemonTypeModal
				type={pokemonTypeAgainst}
				isOpen={isPokemonTypeModalOpen}
				setOpen={() => setIsPokemonTypeModalOpen(false)}
			/> */}

			<div className={styles.pokemonList__button}>
				<Button buttonStyle='primary' onClick={handleLoadMore}>
					Load more
				</Button>
			</div>
		</section>
	);
};