import Header from '../components/Header';
import { getStaticPropsHome } from '../serverRender/homeServerRender';
import { AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai'
import styles from './home.module.scss';
import { useState } from 'react';
import { FormatDatePT_BR } from '../utils/dataUtils';
import Link from "next/link";
import commonStyles from '../styles/common.module.scss';
import { useRouter } from 'next/router';
import { useLoadingRouter } from '../hooks/useLoadingRouter';
import { Loading } from '../components/Loading';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const [posts, setPosts] = useState(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page ? 2 : 0);

  function handleNextPage(queryString: string) {
    const page = queryString ? nextPage + 1 : 0;
    setNextPage(page);
  }

  async function handleLoadPosts() {
    const response = await fetch(`api/posts/pagination/${nextPage}`);
    const newPosts = (await response.json()) as PostPagination;
    setPosts([...posts, ...newPosts.results]);
    handleNextPage(newPosts.next_page);
  }

  return (
    <>
      <div className={commonStyles.content}>
        <Header />
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`post/${post.uid}`}>
              <div className={styles.post} key={post.uid}>
                <h1>{post.data.title}</h1>
                <h2>{post.data.subtitle}</h2>
                <div>
                  <AiOutlineCalendar className={styles.icon} />
                  <time>{FormatDatePT_BR(new Date(post.first_publication_date))}</time>
                  <AiOutlineUser className={styles.icon} />
                  <span>{post.data.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {
          nextPage !== 0 && (
            <button className={styles.nextPage}
              onClick={() => handleLoadPosts()}>
              Carregar mais posts
            </button>
          )
        }
      </div>
    </>
  )
}

export const getStaticProps = getStaticPropsHome;
