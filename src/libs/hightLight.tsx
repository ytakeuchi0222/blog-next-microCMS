import { load } from 'cheerio';
import hljs, { HighlightResult } from 'highlight.js';

export const hightLight = (data): unknown => {
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

	return data;
};
