import { GetStaticProps } from "next";
import { GetPrismicPosts } from "../services/prismicPosts";

export const getStaticPropsHome: GetStaticProps = async () => {
    const response = await GetPrismicPosts(1);
    return {
        props: {
            postsPagination: {
                next_page: response.next_page,
                results: response.results
            }
        },
        revalidate: 60 * 60 * 2
    }
}