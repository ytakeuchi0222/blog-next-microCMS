import { client } from "@/libs/client";
import React from "react";
import styles from "@/styles/Home.module.scss";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleDetail } from "@/components/ArticleDetail";
import { load } from "cheerio";
import hljs from "highlight.js";
//ハイライトのテーマ
import "highlight.js/styles/hybrid.css";
// import "highlight.js/styles/vs2015.css";
type PropsBlogId = {
    blog: { title: string; publishedAt: string; content: string };
};
const BlogId: React.FC<PropsBlogId> = ({ blog }) => {
    console.log({ blog });

    return (
        <>
            <Header></Header>
            <div className={styles.bg}>
                <main className={styles.main}>
                    <ArticleDetail blog={blog}></ArticleDetail>
                    {/* <h1 className={styles.title}>{blog.title}</h1>
                    <p className={styles.publishedAt}>{blog.publishedAt}</p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: `${blog.content}`,
                        }}
                        className={styles.post}
                    /> */}
                </main>
            </div>
            <Footer></Footer>
        </>
    );
};
export default BlogId;
// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "blogs" });

    const paths = data.contents.map(
        (content: { id: string }) => `/blog/${content.id}`
    );
    return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "blogs", contentId: id });

    // コードハイライトを実装
    const $ = load(data.content); // data.contentはmicroCMSから返されるリッチエディタ部
    $("pre code").each((_, elm) => {
        const result = hljs.highlightAuto($(elm).text());
        $(elm).html(result.value);
        $(elm).addClass("hljs");
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
