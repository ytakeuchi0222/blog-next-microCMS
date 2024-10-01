'use client';
import Link from 'next/link';
import { usePagination } from '@/hooks/usePagination';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
export const PaginationCategory = ({ totalCount }) => {
	const PER_PAGE_STRING: string = process.env.NEXT_PUBLIC_PER_PAGE ? process.env.NEXT_PUBLIC_PER_PAGE : '';
	const PER_PAGE = Number(PER_PAGE_STRING);

	const [range, isShow] = usePagination(totalCount);

	// URLのパスを取得
	const pathname = usePathname();

	const router = useRouter();
	const { page } = router.query;

	if (!isShow) return;

	return (
		<>
			<ul className="pagination">
				{range &&
					range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
						<li key={index}>
							<Link href={`${pathname}?page=${number}`}>{number}</Link>
						</li>
					))}
			</ul>
		</>
	);
};
