import React from 'react';
import styles from './loadingSpinner.module.scss';

export const LoadingSpinner = () => {
	return (
		<div className={styles.loadingSpinner}>
			<div className={styles.loadingSpinner__loadingContainer}>
				<div className={styles.loadingSpinner__loadingContainer__spinner}></div>
			</div>
		</div>
	);
};
