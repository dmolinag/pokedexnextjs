'use client';

import { useEffect, useState } from 'react';
import { fetchPokemonList } from '../api/fetchPokemonList';
import { useToastContext } from '../utils';

export function useListPokemon() {
	const { showToast } = useToastContext();

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [pokemons, setPokemons] = useState<any[]>([]);

	const queryPokemons = async (page: number, isFirstPageOnly = false) => {
		setIsLoading(true);
		const response = await fetchPokemonList(page + 1);

		if (!response.error) {
			let newPokemonList = !isFirstPageOnly
				? [...pokemons.concat(response.pokemonList)]
				: response.pokemonList;

			setPokemons(newPokemonList);
			setIsLoading(false);
		} else {
			setPokemons([]);

			setIsLoading(false);
			showToast({
				isDisplay: true,
				message: "Error retrieving Pokemon's list1",
				type: 'error',
			});
		}
	};

	useEffect(() => {
		(async () => {
			const response = await fetchPokemonList(1);

			if (!response.error) {
				setPokemons(response.pokemonList);
				setIsLoading(false);
			} else {
				setPokemons([]);
				setIsLoading(false);
				showToast({
					isDisplay: true,
					message: "Error retrieving Pokemon's list",
					type: 'error',
				});
			}
		})();
	}, []);

	return { isLoading, queryPokemons, pokemons };
}
