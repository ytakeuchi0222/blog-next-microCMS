import Link from 'next/link';
import { usePagination } from '@/hooks/usePagination';
import styles from '@/styles/Pagination.module.scss';
import { useSearchParams } from 'next/navigation';
import classNames from 'classnames'; // classNamesを使用して条件付きクラス適用

export const PaginationSearch = ({ totalCount, keyword }) => {
	const PER_PAGE_STRING: string = process.env.NEXT_PUBLIC_PER_PAGE || '10'; // デフォルト値を明確に設定
	const PER_PAGE = Number(PER_PAGE_STRING);
	const [range, isShow] = usePagination(totalCount);

	// パラメータ取得
	const searchParams = useSearchParams();
	const pageNum = Number(searchParams.get('page')) || 1; // デフォルトのページ番号を 1 に設定

	// ページネーションを表示しない場合はnullを返す
	if (!isShow) return null;

	const totalPages = Math.ceil(totalCount / PER_PAGE);

	return (
		<ul className={styles.pagenation}>
			{range(1, totalPages).map((number) => (
				<li key={number}>
					<Link
						href={`/search/?q=${encodeURIComponent(keyword)}&page=${number}`}
						className={classNames({ [styles.active]: number === pageNum })} // classNamesを使ってクラスを動的に適用
					>
						{number}
					</Link>
				</li>
			))}
		</ul>
	);
};
