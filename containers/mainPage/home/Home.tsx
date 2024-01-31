'use client';

import { PokemonObj } from '../../../types/Pokemon';
import { Card, CardContent } from '../../../components';
import styles from './home.module.scss';
import { getPokemonColor } from '../../../utils/pokemonFunctions';

type HomeProps = {
	pokemon: PokemonObj;
};

export const Home = ({ pokemon }: HomeProps) => {
	return (
		<section className={'flex justify-center w-full my-4'}>
			<Card size='lg' backgroundColor={getPokemonColor(pokemon).color}>
				<>
					<h2 className={`text-center ${styles.card__title}`}>
						Your today&apos;s random Pokemon is...
					</h2>
					<CardContent type='horizontal' pokemon={pokemon} />
				</>
			</Card>
		</section>
	);
};
