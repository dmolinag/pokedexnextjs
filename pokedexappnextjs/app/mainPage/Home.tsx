'use client';

import { PokemonObj } from '@/types/Pokemon';
import styles from './home.module.scss';
import { Card, CardContent } from '@/components';
import { MAX_POKEMON, getPokemonColor } from '@/utils';
import { useGetPokemon } from '@/customHooks';
// import { getPokemonColor } from '../../../utils/pokemonFunctions';

// type HomeProps = {
// 	pokemon: PokemonObj;
// };

export const Home = () => {
	const randomNumber: number = Math.floor(Math.random() * MAX_POKEMON);
	const { randomPokemon } = useGetPokemon(randomNumber);

	return (
		<section className={'flex justify-center w-full my-4'}>
			<Card size='lg' backgroundColor={getPokemonColor(randomPokemon).color}>
				<>
					<h2 className={`text-center ${styles.card__title}`}>
						Your today&apos;s random Pokemon is...
					</h2>
					<CardContent type='horizontal' pokemon={randomPokemon} />
				</>
			</Card>
		</section>
	);
};
