import styles from './footer.module.scss';

export const Footer = () => {
	const renderYear = new Date().getFullYear();
	return (
		<footer
			className={`flex flex-col items-center text-center w-full p-3.5 h-1/6 ${styles.footer}`}
		>
			<span>Derechos de imagen para Nintendo & The Pokemon Company</span>
			<span>Datos obtenidos de API - pokeapi.co</span>
			<span>Pokemon Company &copy; {renderYear}</span>
		</footer>
	);
};
