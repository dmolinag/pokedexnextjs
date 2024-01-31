import { PokemonTypesAgainstType } from '../../types/Pokemon';
import { pokemonTypesAgainst } from '../../utils';
import { PokemonBadgeType } from '../pokemonBadgeType/PokemonBadgeType';
import styles from './pokemonTypeModal.module.scss';
import { Modal } from 'react-aria-components';

type PokemonModalProps = {
	type: string;
	isOpen: boolean;
	setOpen: (isOpen: boolean) => void;
};

export const PokemonTypeModal = ({
	type,
	isOpen,
	setOpen,
}: PokemonModalProps) => {
	const pokemonType: PokemonTypesAgainstType = pokemonTypesAgainst.filter(
		(pokemonType) => {
			return pokemonType.type === type;
		}
	)[0];

	return (
		<>
			{isOpen && (
				<Modal
					isDismissable
					isOpen={isOpen}
					onOpenChange={() => setOpen(isOpen)}
					className={styles.modal}
				>
					<div
						className={`flex gap-3.5 content-center p-2.5 rounded-md bg-black/50 shadow-[0_8px_20px_rgba(0,0,0,0.1)]  ${styles.modal__container}`}
					>
						<div
							className={`flex gap-2 px-1.5 rounded-lg ${styles.modal__container__selectedType}`}
						>
							<div>Type:</div>
							<div>
								<PokemonBadgeType
									key={pokemonType.type}
									type={pokemonType.type}
									tabIndex={false}
								/>
							</div>
						</div>

						{PokemonBadgeTypeComp('Strong against', pokemonType.strongAgainst)}

						{PokemonBadgeTypeComp('Weak against', pokemonType.weakAgainst)}

						{PokemonBadgeTypeComp('Resistance to', pokemonType.resistantTo)}

						{PokemonBadgeTypeComp('Vulnerable to', pokemonType.vulnerableTo)}
					</div>
				</Modal>
			)}
		</>
	);
};

const PokemonBadgeTypeComp = (
	title: string,
	type: string[]
): React.ReactElement => {
	return (
		<div className={`flex gap-2 ${styles.modal__container__otherTypes}`}>
			<div>{title}:</div>
			<div
				className={`flex gap-2 ${styles.modal__container__otherTypes__types}`}
			>
				{type.map((type) => (
					<PokemonBadgeType key={type} type={type} tabIndex={false} />
				))}
			</div>
		</div>
	);
};
