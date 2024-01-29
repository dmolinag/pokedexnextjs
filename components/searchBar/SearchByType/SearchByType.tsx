'use client';

import React from 'react';
import { Button, PokemonBadgeType } from '../../';
import styles from '../searchBar.module.scss';
import { useListPokemon, useListPokemonByType } from '../../../customHooks';
import { POKEMONS_PER_PAGE, pokemonTypes } from '../../../utils';

export const SearchByType = () => {
	const [selectedType, setSelectedType] = React.useState<string>('');
	const { queryPokemonsByType } = useListPokemonByType();
	const { queryPokemons } = useListPokemon();

	const onSearchByType = async (typeName: any) => {
		setSelectedType(typeName);
		if (typeName && typeName !== selectedType) {
			// handlePage(1);
			queryPokemonsByType(typeName, POKEMONS_PER_PAGE);
		} else if (!typeName) {
			queryPokemons(0, true);
		}
	};

	return (
		<div
			className={`flex flex-col align-center ${styles.searchBar__searchByType}`}
		>
			<h2 className={`m-4 ${styles.searchBar__searchByType__title}`}>
				Search by type
			</h2>

			<ul
				className={'flex flex-row gap-1 w-full overflow-x-scroll list-none'}
				data-testid='pokemon-types-list'
			>
				{pokemonTypes.map((type) => {
					return (
						<li key={type.name}>
							<PokemonBadgeType
								type={type.name}
								tabIndex={false}
								button={true}
								handleClick={onSearchByType}
								addClassname={styles.searchBar__searchByType__pokemonTypesBadge}
							/>
						</li>
					);
				})}
				<li>
					<Button
						buttonStyle='badge'
						bgColor={'white'}
						onClick={() => onSearchByType(undefined)}
						textColor='black'
						name=''
					>
						Clear
					</Button>
				</li>
			</ul>
		</div>
	);
};
