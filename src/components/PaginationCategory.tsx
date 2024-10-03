'use client';
import Link from 'next/link';
import { usePagination } from '@/hooks/usePagination';
import { usePathname } from 'next/navigation';
import styles from '@/styles/Pagination.module.scss';
// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
export const PaginationCategory = ({ totalCount }) => {
	const PER_PAGE_STRING: string = process.env.NEXT_PUBLIC_PER_PAGE ? process.env.NEXT_PUBLIC_PER_PAGE : '';
	const PER_PAGE = Number(PER_PAGE_STRING);

	const [range, isShow] = usePagination(totalCount);

	// URLのパスを取得
	const pathname = usePathname();

	// const router = useRouter();
	// const { page } = router.query;
	//パラメータ取得
	const searchParams = useSearchParams();
	const pageNum = Number(searchParams.get('page'));
	if (!isShow) return;

	return (
		<>
			<ul className={styles.pagenation}>
				{range &&
					range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
						<li key={index}>
							<Link
								href={`${pathname}?page=${number}`}
								className={`test ${number === pageNum && styles.active}`}
							>
								{number}
							</Link>
						</li>
					))}
			</ul>
		</>
	);
};
