import { GetStaticProps, GetStaticPaths } from "next";
import { GetPrismicPost } from "../services/prismicPosts";

export const getStaticPathsPost: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    }
}

export const getStaticPropsPost: GetStaticProps = async ({ params }) => {
    const { slug } = params;
    const post = await GetPrismicPost(String(slug));
    return {
        props: {
            post,
            revalidate: 60 * 60 * 2
        }
    }
}