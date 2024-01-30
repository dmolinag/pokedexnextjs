import styles from './searchBar.module.scss';
import { SearchByType } from './SearchByType/SearchByType';
import { SearchByName } from './SearchByName/SearchByName';

interface SearchBarProp {
	handlePage: (page: number) => void;
}

export const SearchBar = ({ handlePage }: SearchBarProp) => {
	return (
		<section className={`flex flex-col gap-8 ${styles.searchBar}`}>
			<SearchByType handlePage={handlePage} />

			{/* <SearchByName /> */}
		</section>
	);
};
