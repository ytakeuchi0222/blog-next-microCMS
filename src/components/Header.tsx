import styles from '@/styles/Header.module.scss';
import Link from 'next/link';
import { SearchArea } from '@/components/SearchArea';
import { CategoryList } from '@/components/CategoryList';
export const Header = ({ category }) => {
	return (
		<>
			<header className={styles.headerArea}>
				<div className={styles.header}>
					<p className={styles.title}>
						<Link href="/">microCMS+Next.js</Link>
					</p>
					<div className={styles.rightArea}>
						<SearchArea />
						<CategoryList category={category} />
					</div>
				</div>
			</header>
		</>
	);
};
