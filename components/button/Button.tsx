'use client';

import React, { MouseEvent } from 'react';
import styles from './button.module.scss';

type ButtonStyle = 'primary' | 'secondary' | 'badge';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

type Props = {
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	children: React.ReactNode;
	size?: ButtonSize;
	buttonStyle?: ButtonStyle;
	role?: React.AriaRole;
	disabled?: boolean;
	tabIndex?: number;
	bgColor?: string;
	name?: string;
	textColor?: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
	addClassname?: string;
};

export const Button = ({
	buttonStyle = 'primary',
	size = 'md',
	disabled = false,
	textColor,
	type = 'button',
	...props
}: Props) => {
	const className = `${getSizeClass(size)} ${getStyleClass(buttonStyle)} ${
		props.addClassname && props.addClassname
	}`;

	return (
		<button
			onClick={props.onClick}
			name={props.name}
			className={className}
			disabled={disabled}
			role={props.role}
			tabIndex={props.tabIndex}
			style={{ background: props.bgColor, color: textColor && textColor }}
			type={type}
		>
			{props.children}
		</button>
	);
};

Button.displayName = 'Button';

function getSizeClass(size?: ButtonSize | null): string {
	switch (size) {
		case 'xs':
			return styles.xs;
		case 'sm':
			return styles.sm;
		case 'md':
			return styles.md;
		case 'lg':
			return styles.lg;

		default:
			return styles.md;
	}
}

function getStyleClass(buttonStyle?: ButtonStyle | null): string {
	switch (buttonStyle) {
		case 'primary':
			return styles.primary;

		case 'secondary':
			return styles.secondary;

		case 'badge':
			return styles.badge;

		default:
			return styles.primary;
	}
}
