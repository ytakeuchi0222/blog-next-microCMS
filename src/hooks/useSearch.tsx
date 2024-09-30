// import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';

type Search = [string, React.Dispatch<React.SetStateAction<string>>, { search: () => void }];

export const useSearch = (): Search => {
	const [keyword, setKeyword] = useState('');

	const search = () => {
		Router.push('/search/?q=' + keyword + '&page=1');
	};

	return [keyword, setKeyword, { search }];
};
