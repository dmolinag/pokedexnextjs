'use client';

import { PokemonObj } from '../../../types/Pokemon';
import { useListPokemon } from '../../../customHooks';
import styles from './pokemonList.module.scss';
import { useEffect, useState } from 'react';
import { Button } from '../../../components';
import _ from 'lodash';
import { PokemonCard } from './pokemonCard';

export const PokemonList = () => {
	const { queryPokemons, pokemons } = useListPokemon();
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		queryPokemons(page);
	}, [page]);

	return (
		<>
			{/* <SearchBar handlePage={() => 1} /> */}

			<section className={`flex flex-col items-center w-full my-4`}>
				<div className={`flex flex-wrap justify-evenly ${styles.pokemonList}`}>
					{pokemons.map((pokemon: PokemonObj) => (
						<PokemonCard key={pokemon.id} pokemon={pokemon} />
					))}
				</div>

				<div className='w-fit self-center'>
					<Button
						buttonStyle='primary'
						onClick={() => setPage((prevState) => prevState + 1)}
					>
						Load more
					</Button>
				</div>
			</section>
		</>
	);
};
