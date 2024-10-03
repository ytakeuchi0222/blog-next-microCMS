// import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';

type Search = [
	string,
	React.Dispatch<React.SetStateAction<string>>,
	React.Dispatch<React.SetStateAction<boolean>>,
	{ search: (event) => void },
];

export const useSearch = (): Search => {
	const [keyword, setKeyword] = useState('');
	const [isComposing, setIsComposing] = useState(false);
	const search = (event) => {
		if (event.key === 'Enter' && !isComposing) {
			Router.push('/search/?q=' + keyword + '&page=1');
		}
	};

	return [keyword, setKeyword, setIsComposing, { search }];
};
