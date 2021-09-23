interface PostSummary {
    uid?: string;
    first_publication_date: string | null;
    data: {
        title: string;
        subtitle: string;
        author: string;
    };
}

interface Post {
    uid?: string;
    first_publication_date: string | null;
    data: {
        title: string;
        subtitle: string;
        author: string;
        banner: string;
        content: Content[];
    };
}

interface Content {
    heading: string;
    body: Body[];
}

interface Body {
    text: string[];
}

export interface PostPagination {
    next_page: string;
    results: PostSummary[];
}

export interface PostEspecific {
    post: Post;
}