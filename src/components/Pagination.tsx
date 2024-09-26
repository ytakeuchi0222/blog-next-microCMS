import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Pagination = ({ totalCount }) => {
	const PER_PAGE_STRING: string = process.env.NEXT_PUBLIC_PER_PAGE ? process.env.NEXT_PUBLIC_PER_PAGE : '';
	const PER_PAGE = Number(PER_PAGE_STRING);
	const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
	const [isShow, setIsShow] = useState(true);
	useEffect(() => {
		if (totalCount / PER_PAGE <= 1) setIsShow(false);
		// eslint-disable-next-line
	}, []);
	if (!isShow) {
		return;
	}
	return (
		<ul>
			{range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
				<li key={index}>
					<Link href={`/blog/page/${number}`}>{number}</Link>
				</li>
			))}
		</ul>
	);
};
