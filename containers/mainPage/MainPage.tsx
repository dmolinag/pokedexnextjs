'use server';

import { Suspense } from 'react';
import { Home } from './home/Home';
import { PokemonList } from './pokemonList/PokemonList';
import { MAX_POKEMON } from '../../utils';
import { SearchBar } from '@/components/searchBar/SearchBar';
import { fetchPokemon } from '@/api/fetchPokemon';
import { LoadingSpinner } from '@/components/loading/LoadingSpinner';
import { fetchPokemonList } from '@/api/fetchPokemonList';
import { PokemonObj } from '@/types/Pokemon';

const MainPage = async () => {
	const randomNumber: number = Math.floor(Math.random() * MAX_POKEMON);
	let randomPokemon = await fetchPokemon(randomNumber);

	// const [page, setPage] = useState<number>(1);
	MainPage;
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<Home pokemon={randomPokemon.data} />
			<PokemonList />
		</Suspense>
	);
};

export default MainPage;
