import MainPage from '@/containers/mainPage/MainPage';
import { PokemonListProvider } from '@/utils';

const Home = () => {
	return (
		<PokemonListProvider>
			<MainPage />
		</PokemonListProvider>
	);
};

export default Home;
