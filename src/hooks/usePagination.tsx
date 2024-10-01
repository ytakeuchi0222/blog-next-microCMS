// import axios from 'axios';
import { useState, useEffect } from 'react';

export const usePagination = (totalCount: number): [(start: number, end: number) => number[], boolean] => {
	const PER_PAGE_STRING: string = process.env.NEXT_PUBLIC_PER_PAGE ? process.env.NEXT_PUBLIC_PER_PAGE : '';
	const PER_PAGE = Number(PER_PAGE_STRING);
	const [check, setCheck] = useState(totalCount / PER_PAGE);
	const [isShow, setIsShow] = useState(true);

	const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

	useEffect(() => {
		setCheck(totalCount / PER_PAGE);
	}, [totalCount]);
	useEffect(() => {
		if (check <= 1) {
			setIsShow(false);
		} else {
			setIsShow(true);
		}
	}, [check]);
	useEffect(() => {}, [isShow]);
	console.log(range);
	return [range, isShow];
};
