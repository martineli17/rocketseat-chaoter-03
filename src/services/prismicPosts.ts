import { getPrismicClient } from "./prismic";
import Prismic from '@prismicio/client';
import { PostEspecific, PostPagination } from "../types/posts";
import { RichText } from "prismic-dom";

export async function GetPrismicPosts(page: number): Promise<PostPagination> {
    const prismicClient = getPrismicClient();
    const response = await prismicClient.query([Prismic.predicates.at("document.type", "post")],
        {
            fetch: ["posts.title", "posts.subtitle", "posts.author"],
            pageSize: 1,
            page
        });
    const posts = response.results.map(post => {
        return {
            uid: post.uid,
            first_publication_date: post.first_publication_date,
            data: {
                title: post.data.title,
                subtitle: post.data.subtitle,
                author: post.data.author,
            }
        }
    });
    return {
        next_page: response.next_page,
        results: posts
    }
}

export async function GetPrismicPost(slug: string) {
    const prismicClient = getPrismicClient();
    const response = await prismicClient.getByUID("post", slug, {});
    return response;
    // const post: PostEspecific = {
    //     post: {
    //         first_publication_date: response.first_publication_date,
    //         data: {
    //             title: response.data.title,
    //             subtitle: response.data.subtitle,
    //             banner: response.data.banner.url,
    //             author: response.data.author,
    //             content: response.data.content.map(content => {
    //                 return{
    //                     heading: content.heading,
    //                     body: content.body.map(body => {
    //                         return {
    //                             text: body.text,
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //     }
    // }

    // return post;
}
