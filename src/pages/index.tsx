import Link from "next/link";
import Image from "next/image";
import { client } from "@/libs/client";
import styles from "@/styles/Home.module.scss";
import { Header } from "@/pages/components/Header";
import { Footer } from "./components/Footer";
const Home = ({ blog }) => {
    console.log(process.env.NEXT_PUBLIC_API_KEY);

    return (
        <>
            <Header></Header>
            <div className={styles.bg}>
                <ul>
                    {blog.map((blog) => (
                        <li key={blog.id}>
                            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                        </li>
                    ))}
                </ul>
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
