import Image from 'next/image';
import { PokemonObj } from '../../types/Pokemon';
import { formatPokemonId } from '../../utils';
import { PokemonBadgeType } from '../pokemonBadgeType/PokemonBadgeType';
import styles from './pokemonDetailsModal.module.scss';
import { Dialog, Meter, Modal } from 'react-aria-components';

type PokemonModalProps = {
	pokemon: PokemonObj;
	isOpen: boolean;
	setOpen: (isOpen: boolean) => void;
};

export const PokemonModal = ({
	pokemon,
	isOpen,
	setOpen,
}: PokemonModalProps) => {
	const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png?w=${100}&q=${100}`;

	return (
		<>
			{isOpen && (
				<Modal
					isDismissable
					isOpen={isOpen}
					onOpenChange={() => setOpen(isOpen)}
					className={`rounded-md p-2.5 outline-none bg-black/50 shadow-[0_8px_20px_rgba(0,0,0,0.1)] ${styles.pokemonModal}`}
				>
					<Dialog
						className={`outline-none flex w-full ${styles.pokemonModal__dialog__container} ${styles.pokemonModal__dialog}`}
					>
						<div
							className={`flex flex-col justify-around items-center mx-auto my-2 ${styles.cardContent}`}
						>
							<Image
								src={imgUrl}
								alt={pokemon.name}
								className={`relative w-1/2 ${styles.cardContent__image}`}
								width={100}
								height={100}
							/>

							{renderPokemonCharacteristics(pokemon)}
						</div>
						<div className={`relative   ${styles.stats}`}>
							{pokemon.stats.map((item) => {
								const pokemonStat =
									item.stat.name.charAt(0).toUpperCase() +
									item.stat.name.slice(1);

								return (
									<div className={styles.stats__stat} key={item.stat.name}>
										<div>{pokemonStat}</div>
										<div>{item.base_stat}</div>
										<Meter value={item.base_stat} aria-label={item.stat.name}>
											{({ percentage }) => (
												<div className='bar'>
													<div
														className={`fill ${styles.meter}`}
														style={{ width: percentage + '%' }}
													/>
												</div>
											)}
										</Meter>
									</div>
								);
							})}
						</div>
					</Dialog>
				</Modal>
			)}
		</>
	);
};

const renderPokemonCharacteristics = (pokemon: PokemonObj) => {
	return (
		<div
			className={`flex flex-col items-center relative gap-1 ${styles.cardContent__pokemonInfo}`}
		>
			<div className={styles.cardContent__pokemonInfo__number}>
				{formatPokemonId(pokemon.id)}
			</div>
			<div className={`capitalize ${styles.cardContent__pokemonInfo__name}`}>
				{pokemon.name}
			</div>

			<div className='flex flex-row gap-2'>
				{pokemon.types.map(({ type }) => (
					<PokemonBadgeType key={type.name} type={type.name} tabIndex={false} />
				))}
			</div>
			<div
				className={`flex flex-row items-center gap-12 ${styles.cardContent__characteristics}`}
			>
				<div className='flex flex-col items-center'>
					<div className={styles.value}>{pokemon.height} m</div>
					<div>Height</div>
				</div>
				<div className='flex flex-col items-center'>
					<div className={styles.value}>{pokemon.weight} Kg</div>
					<div>Weight</div>
				</div>
			</div>
		</div>
	);
};
