import styles from '@/styles/SearchArea.module.scss';
// import { useSearch } from '@/hooks/useSearch';
import { useState } from 'react';
import Router from 'next/router';
export const SearchArea = () => {
	// const [keyword, setKeyword, { search }] = useSearch();
	const [keyword, setKeyword] = useState('');
	const [isComposing, setIsComposing] = useState(false);
	const search = (event) => {
		if (event.key === 'Enter' && !isComposing) {
			Router.push('/search/?q=' + keyword + '&page=1');
		}
	};

	return (
		<div className={styles.searchArea}>
			<input
				value={keyword}
				placeholder="キーワードで検索	"
				onChange={(e) => setKeyword(e.target.value)}
				onKeyDown={search}
				onCompositionStart={() => setIsComposing(true)}
				onCompositionEnd={() => setIsComposing(false)}
			/>
		</div>
	);
};
