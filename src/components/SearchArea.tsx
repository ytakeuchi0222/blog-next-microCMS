import styles from '@/styles/SearchArea.module.scss';
import { useState, useCallback } from 'react';
import Router from 'next/router';

export const SearchArea = () => {
	const [keyword, setKeyword] = useState('');
	const [isComposing, setIsComposing] = useState(false);

	// useCallbackを使って、検索処理をメモ化
	const handleSearch = useCallback(
		(event) => {
			const trimmedKeyword = keyword.trim(); // 空白の除去

			if (event.key !== 'Enter' || isComposing || !trimmedKeyword) {
				return;
			}

			Router.push(`/search/?q=${encodeURIComponent(trimmedKeyword)}&page=1`);
		},
		[keyword, isComposing]
	);

	return (
		<div className={styles.searchArea}>
			<input
				value={keyword}
				placeholder="キーワードで検索"
				onChange={(e) => setKeyword(e.target.value)}
				onKeyDown={handleSearch}
				onCompositionStart={() => setIsComposing(true)}
				onCompositionEnd={() => setIsComposing(false)}
			/>
		</div>
	);
};
