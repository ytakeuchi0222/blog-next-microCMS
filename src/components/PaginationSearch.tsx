import Link from 'next/link';
import { usePagination } from '@/hooks/usePagination';
import { useState, useEffect } from 'react';
export const PaginationSearch = ({ totalCount, keyword }) => {
	const PER_PAGE_STRING: string = process.env.NEXT_PUBLIC_PER_PAGE ? process.env.NEXT_PUBLIC_PER_PAGE : '';
	const PER_PAGE = Number(PER_PAGE_STRING);
	const [range, isShow] = usePagination(totalCount);
	if (!isShow) return;
	return (
		<>
			<ul className="pagination">
				{range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
					<li key={index}>
						<Link href={`/search/?q=${keyword}&page=${number}`}>{number}</Link>
					</li>
				))}
			</ul>
		</>
	);
};
