import Link from 'next/link';
import { usePagination } from '@/hooks/usePagination';
import styles from '@/styles/Pagination.module.scss';

import { useSearchParams } from 'next/navigation';

export const PaginationSearch = ({ totalCount, keyword }) => {
	const PER_PAGE_STRING: string = process.env.NEXT_PUBLIC_PER_PAGE ? process.env.NEXT_PUBLIC_PER_PAGE : '';
	const PER_PAGE = Number(PER_PAGE_STRING);
	const [range, isShow] = usePagination(totalCount);
	//パラメータ取得
	const searchParams = useSearchParams();
	const pageNum = Number(searchParams.get('page'));

	if (!isShow) return;
	return (
		<>
			<ul className={styles.pagenation}>
				{range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
					<li key={index}>
						<Link
							href={`/search/?q=${keyword}&page=${number}`}
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
