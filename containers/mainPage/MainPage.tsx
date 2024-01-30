import { Suspense } from 'react';
import { Home } from './home/Home';
import { PokemonList } from './pokemonList/PokemonList';
import { MAX_POKEMON } from '../../utils';
import { fetchPokemon } from '@/api/fetchPokemon';
import { LoadingSpinner } from '@/components/loading/LoadingSpinner';

const MainPage = async () => {
	const randomNumber: number = Math.floor(Math.random() * MAX_POKEMON);
	let { data } = await fetchPokemon(randomNumber);

	return (
		<Suspense fallback={<LoadingSpinner />}>
			<Home pokemon={data} />
			<PokemonList />
		</Suspense>
	);
};

export default MainPage;
