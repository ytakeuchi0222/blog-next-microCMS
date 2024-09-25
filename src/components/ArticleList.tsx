import Link from "next/link";
import FormatDate from "@/hooks/FormatDate";
export const ArticleList = ({ blog }) => {
    return (
        <>
            {blog.map((blog) => (
                <article key={blog.id}>
                    <Link href={`/blog/${blog.id}`}>
                        {FormatDate(blog.publishedAt)}

                        <p className="title">{blog.title}</p>
                    </Link>
                </article>
            ))}
        </>
    );
};
