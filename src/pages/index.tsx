import { client } from "@/libs/client";
import styles from "@/styles/Home.module.scss";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleList } from "@/components/ArticleList";
const Home = ({ blog }) => {
    console.log(process.env.NEXT_PUBLIC_API_KEY);
    return (
        <>
            <Header></Header>
            <div className={styles.bg}>
                <main className={styles.main}>
                    <ArticleList blog={blog}></ArticleList>
                </main>
            </div>
            <Footer></Footer>
        </>
    );
};
export default Home;
// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
    const data = await client.get({ endpoint: "blogs" });

    return {
        props: {
            blog: data.contents,
        },
    };
};
