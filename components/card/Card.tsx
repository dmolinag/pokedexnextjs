import styles from './card.module.scss';

type CardProps = {
	size?: CardSize;
	backgroundColor?: string;
	children: React.ReactElement | undefined;
};

type CardSize = 'sm' | 'md' | 'lg';

export const Card = ({ size = 'md', backgroundColor, children }: CardProps) => {
	const className = `rounded-xl ${styles.card} ${getSizeClass(size)} `;

	return (
		<div className={className} style={{ backgroundColor: backgroundColor }}>
			{children}
		</div>
	);
};

function getSizeClass(size?: CardSize | null): string {
	switch (size) {
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
