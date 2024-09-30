// import axios from 'axios';
import { useState, useEffect } from 'react';

export const usePagination = (totalCount: number, PER_PAGE: number) => {
	const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
	const [isShow, setIsShow] = useState(true);
	useEffect(() => {
		if (totalCount / PER_PAGE <= 1) setIsShow(false);
		// eslint-disable-next-line
	}, []);
	if (!isShow) {
		return;
	}
	return range;
};
