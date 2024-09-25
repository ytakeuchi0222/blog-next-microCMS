import { client } from '@/libs/client';
import React from 'react';
import styles from '@/styles/Home.module.scss';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticleDetail } from '@/components/ArticleDetail';
import { load } from 'cheerio';
import hljs, { HighlightResult } from 'highlight.js';
//ハイライトのテーマ
import 'highlight.js/styles/hybrid.css';
// import "highlight.js/styles/vs2015.css";
type PropsBlogId = {
	blog: { title: string; publishedAt: string; content: string };
};
const BlogId: React.FC<PropsBlogId> = ({ blog }) => {
	return (
		<>
			<main className={styles.main}>
				<ArticleDetail blog={blog}></ArticleDetail>
			</main>
		</>
	);
};
export default BlogId;
// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
	const data = await client.get({ endpoint: 'blogs' });

	const paths = data.contents.map((content: { id: string }) => `/blog/${content.id}`);
	return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
	const id = context.params.id;
	const data = await client.get({ endpoint: 'blogs', contentId: id });

	// コードハイライトを実装
	const $ = load(data.content); // data.contentはmicroCMSから返されるリッチエディタ部

	// コードブロックのファイル名が入力されている場合の処理
	$('div[data-filename]').each((_, elm) => {
		// data-filename属性の値を持つspanを
		// <div data-filename="{入力したファイル名}">の最初の子要素として追加
		$(elm).prepend(`<span>${$(elm).attr('data-filename')}</span>`);
	});

	// コードブロックのシンタックスハイライトを行う
	$('pre code').each((_, elm) => {
		const language = $(elm).attr('class') || '';
		let result: HighlightResult;
		//let result: AutoHighlightResult;
		if (language == '') {
			// 言語が入力なしの場合、自動判定
			result = hljs.highlightAuto($(elm).text());
		} else {
			// 言語が入力ありの場合、入力された言語で判定
			result = hljs.highlight($(elm).text(), {
				language: language.replace('language-', ''),
			});
		}
		$(elm).html(result.value);
		$(elm).addClass('hljs');
	});

	data.content = $.html();

	return {
		props: {
			blog: data,
			// bodyをコードハイライト実装ずみのものに入れ替え
			// blog: { ...data, body: $.html() },
		},
	};
};
