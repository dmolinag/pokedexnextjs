import React from 'react';
import styles from './loadingSpinner.module.scss';

export const LoadingSpinner = () => {
	return (
		<div className={`z-50 fixed w-full h-full bg-black/20 `}>
			<div
				className={`w-12 h-12 rounded-full top-1/2 left-1/2 fixed ${styles.spinner}`}
			/>
		</div>
	);
};
