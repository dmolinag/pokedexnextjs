'use client';

import { PokemonObj } from '../../../types/Pokemon';
import { useListPokemon, useListPokemonByType } from '../../../customHooks';
import styles from './pokemonList.module.scss';
import { useEffect, useState } from 'react';
import { Button } from '../../../components';
import { PokemonCard } from './pokemonCard';
import { SearchBar } from '@/components/searchBar/SearchBar';
import { POKEMONS_PER_PAGE, usePokemonsListContext } from '@/utils';
import { LoadingSpinner } from '@/components/loading/LoadingSpinner';

export const PokemonList = () => {
	const { queryPokemons, isLoading } = useListPokemon();
	const { queryPokemonsByType } = useListPokemonByType();
	const { pokemonList, pokemonType, filtered } = usePokemonsListContext();

	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		if (!pokemonType) {
			queryPokemons(page);
		} else {
			queryPokemonsByType(pokemonType, POKEMONS_PER_PAGE);
		}
	}, []);

	const handleLoadMore = () => {
		const nextPage = page + 1;

		if (!filtered) {
			queryPokemons(nextPage);
		} else {
			queryPokemonsByType(pokemonType, POKEMONS_PER_PAGE * nextPage);
		}
		setPage(nextPage);
	};

	return (
		<>
			<SearchBar handlePage={setPage} />

			<section className={`flex flex-col items-center w-full my-4`}>
				<div className={`flex flex-wrap justify-evenly ${styles.pokemonList}`}>
					{pokemonList.map((pokemon: PokemonObj) => (
						<PokemonCard key={pokemon.id} pokemon={pokemon} />
					))}
				</div>

				<div className='w-fit self-center'>
					<Button buttonStyle='primary' onClick={handleLoadMore}>
						Load more
					</Button>
				</div>
			</section>
		</>
	);
};
