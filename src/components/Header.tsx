import styles from "@/styles/Header.module.scss";
import Image from "next/image";
import Link from "next/link";
export const Header = () => {
    return (
        <header className={styles.headerArea}>
            <div className={styles.icon}>
                <Link href="/">
                    <Image
                        src="https://ytakeuchi.jp/wp-content/uploads/2020/04/logo-150x150.png"
                        alt="sample image"
                        width={70}
                        height={70}
                    />
                </Link>
            </div>

            <p className={styles.name}>ytakeuchi.jp</p>
            {/* <p className={styles.job}>フロントエンドエンジニア</p>
                <p>github,mail,twitter</p> */}
        </header>
    );
};
