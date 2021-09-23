import { NextApiResponse, NextApiRequest } from "next";
import { GetPrismicPosts } from "../../../../services/prismicPosts";
import { PostPagination } from "../../../../types/posts";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { page } = req.query
        const posts = await GetPrismicPosts(Number(page));
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json(null);
    }
}
