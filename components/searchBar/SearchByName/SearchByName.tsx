'use client';

import React from 'react';
import { InputComp } from '../..';
import styles from '../searchBar.module.scss';
import { useDebounce } from '../../../customHooks';

export const SearchByName = () => {
	const { queryByName, queryLoading } = useDebounce();

	const handleSearch = (value: string) => {
		queryByName(value);
	};

	return (
		<div className='flex flex-col items-center'>
			<h2 className={`m-4 ${styles.searchBar__title}`}>Search by name</h2>
			<InputComp onChange={handleSearch} loading={queryLoading} />
		</div>
	);
};
