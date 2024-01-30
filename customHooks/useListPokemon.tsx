'use client';

import { useState } from 'react';
import { fetchPokemonList } from '../api/fetchPokemonList';
import { usePokemonsListContext, useToastContext } from '../utils';

export function useListPokemon() {
	const { pokemonList, definePokemonList } = usePokemonsListContext();
	const { showToast } = useToastContext();

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const queryPokemons = async (page: number, isFirstPageOnly = false) => {
		setIsLoading(true);
		const response = await fetchPokemonList(page);

		if (!response.error) {
			let newPokemonList = !isFirstPageOnly
				? [...pokemonList.concat(response.pokemonList)]
				: response.pokemonList;

			definePokemonList(newPokemonList, '');
			setIsLoading(false);
		} else {
			definePokemonList([], '');

			setIsLoading(false);
			showToast({
				isDisplay: true,
				message: "Error retrieving Pokemon's list1",
				type: 'error',
			});
		}
	};

	return { isLoading, queryPokemons };
}
