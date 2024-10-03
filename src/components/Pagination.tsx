import Link from 'next/link';
import styles from '@/styles/Pagination.module.scss';
import { usePagination } from '@/hooks/usePagination';
import { useParams } from 'next/navigation';
export const Pagination = ({ totalCount }) => {
	const PER_PAGE_STRING: string = process.env.NEXT_PUBLIC_PER_PAGE ? process.env.NEXT_PUBLIC_PER_PAGE : '';
	const PER_PAGE = Number(PER_PAGE_STRING);
	const [range, isShow] = usePagination(totalCount);
	//パラメータ取得
	const params = useParams();
	// console.log(params);
	const id = params && params.id;
	// console.log(id);
	const pageNum = id ? Number(id) : 1;

	if (!isShow) return;
	return (
		<ul className={styles.pagenation}>
			{range &&
				range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
					<li key={index}>
						<Link href={`/blog/page/${number}`} className={`test ${number === pageNum && styles.active}`}>
							{number}
						</Link>
					</li>
				))}
		</ul>
	);
};
