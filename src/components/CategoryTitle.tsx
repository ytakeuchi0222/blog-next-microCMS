import styles from '@/styles/CategoryTitle.module.scss';
export const Categorytitle = ({ type, keyword, totalCount }) => {
	return (
		<div className={styles.categorytitle}>
			<p>{type}</p>
			{keyword} {totalCount && `で検索した結果：${totalCount} 件`}
		</div>
	);
};
