'use client';

import { PokemonObj } from '../../types/Pokemon';
import { formatPokemonId } from '../../utils/pokemonFunctions';
import { PokemonBadgeType } from '../';
import styles from './cardContent.module.scss';
import { BiHeart, BiSolidHeart, BiInfoCircle } from 'react-icons/bi';
import { getUserInfo } from '../../utils';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Image from 'next/image';

type CardContentProps = {
	type: CardType;
	pokemon: PokemonObj;
	openModal?: () => void;
	openPokemonTypeModal?: (type: string) => void;
	favPokemons?: number[];
	onSetFavorites?: (id: number) => void;
	onRemoveFavorites?: (id: number) => void;
};

type CardType = 'horizontal' | 'vertical';

export const CardContent = ({
	type,
	pokemon,
	openModal,
	openPokemonTypeModal,
	favPokemons = [],
	onSetFavorites,
	onRemoveFavorites,
}: CardContentProps) => {
	const imageLoader = () => {
		return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png?w=${100}&q=${100}`;
	};

	const renderFav = () => {
		const savedPokemon = favPokemons.filter(
			(savedPokemon: number) => savedPokemon === pokemon.id
		);

		const user = getUserInfo();

		if (!user) {
			return null;
		}

		if (savedPokemon.length > 0) {
			return (
				<BiSolidHeart
					size={'1.5rem'}
					onClick={() => onRemoveFavorites && onRemoveFavorites(pokemon.id)}
				/>
			);
		} else {
			return (
				<BiHeart
					size={'1.5rem'}
					onClick={() => onSetFavorites && onSetFavorites(pokemon.id)}
				/>
			);
		}
	};

	const renderCardContent = () => {
		if (type === 'horizontal') {
			return (
				<div
					className={`flex flex-col justify-around items-center relative ${styles.horizontalCardContent}`}
				>
					{renderPokemonCharacteristics(pokemon)}
					<Image
						src={`${pokemon.id}.png`}
						alt={pokemon.name}
						className={styles.horizontalCardContent__image}
						width={100}
						height={100}
						loader={imageLoader}
					/>
				</div>
			);
		} else {
			return (
				<div className='flex flex-col justify-around items-center relative'>
					<ReactTooltip
						id={`pokemon-tooltip-${pokemon.id}`}
						place='top-end'
						variant='info'
						content='Press here to get more information'
					/>

					<div
						className={`absolute top-1 right-7 z-10 cursor-pointer ${styles.cardContent__favorite}`}
					>
						{renderFav()}
					</div>
					<div
						className={`absolute top-1 right-1 z-10 cursor-pointer ${styles.cardContent__info}`}
						onClick={openModal}
						data-tooltip-id={`pokemon-tooltip-${pokemon.id}`}
					>
						<BiInfoCircle size={'1.5rem'} />
					</div>
					<div
						className={`flex flex-col justify-around items-center relative p-4 ${styles.verticalCardContent}`}
					>
						<Image
							src={`${pokemon.id}.png`}
							alt={pokemon.name}
							className={styles.verticalCardContent__image}
							width={100}
							height={100}
							loader={imageLoader}
						/>

						{renderPokemonCharacteristics(pokemon, openPokemonTypeModal)}
					</div>
				</div>
			);
		}
	};

	return <>{renderCardContent()}</>;
};

export const renderPokemonCharacteristics = (
	pokemon: PokemonObj,
	openPokemonTypeModal?: (type: string) => void
) => {
	return (
		<div
			className={`flex flex-col items-center gap-1 select-none ${styles.cardContent__pokemonInfo} `}
		>
			<div className={styles.cardContent__pokemonInfoId}>
				{formatPokemonId(pokemon.id)}
			</div>
			<div className={`capitalize ${styles.cardContent__pokemonInfoName}`}>{pokemon.name}</div>

			<div className={`flex gap-2 ${styles.cardContent__badgeList}`}>
				{pokemon.types.map(({ type }: any) => (
					<PokemonBadgeType
						key={type.name}
						type={type.name}
						tabIndex={false}
						openPokemonTypeModal={() =>
							openPokemonTypeModal && openPokemonTypeModal(type.name)
						}
					/>
				))}
			</div>
			<div
				className={`flex flex-row items-center gap-12 ${styles.pokemon__characteristics}`}
			>
				<div className='flex flex-col items-center'>
					<div className={styles.pokemon__characteristics__pokemonValue}>
						{pokemon.height} m
					</div>
					<div>Height</div>
				</div>
				<div className='flex flex-col items-center'>
					<div className={styles.pokemon__characteristics__pokemonValue}>
						{pokemon.weight} Kg
					</div>
					<div>Weight</div>
				</div>
			</div>
		</div>
	);
};
