import axios from 'axios';
import { useState } from 'react';

type funcs = {
	search: () => void;
};
type Search = [unknown, boolean, string, React.Dispatch<React.SetStateAction<string>>, funcs];

export const useSearch = (): Search => {
	const [searchResult, setSearchResult] = useState([]);
	const [isSearch, setIsSearch] = useState(false);
	const [keyword, setKeyword] = useState('');

	const search = async () => {
		// 検索APIにリクエストを送信
		const res = await axios.get('/api/search', {
			params: {
				keyword,
			},
		});
		//isSearchを更新
		setIsSearch(true);
		// 検索結果をセット
		setSearchResult(res.data.contents);
	};

	return [searchResult, isSearch, keyword, setKeyword, { search }];
};
