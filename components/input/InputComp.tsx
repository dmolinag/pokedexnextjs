import { TextField, Input } from 'react-aria-components';

import styles from './input.module.scss';

export interface InputCompProps {
	onChange: (e: string) => void;
	label?: string;
	isRequired?: boolean;
	disabled?: boolean;
	tabIndex?: number;
	loading?: boolean;
	value?: string;
}

export const InputComp = ({ disabled = false, ...props }: InputCompProps) => {
	const mClassname = props.label ? styles.labelInput : '';

	return (
		<TextField
			isRequired={props.isRequired}
			className={`flex flex-row items-center gap-1.5 ${mClassname} ${styles.container}`}
			aria-label='search term'
		>
			{props.label && <label>{props.label}:</label>}
			<Input
				onChange={(e) => props.onChange(e.target.value)}
				placeholder={props.label}
				value={props.value}
				data-testid={'Search by name'}
				className='w-full h-10 text-3xl rounded-lg text-black'
			/>
			{props.loading && (
				<div className={`w-5 h-4 rounded ${styles.spinner}`} data-testid='spinner'></div>
			)}
		</TextField>
	);
};
