import { AiOutlineCalendar, AiOutlineUser, AiOutlineClockCircle } from 'react-icons/ai';
import Header from '../../components/Header';
import { getStaticPropsPost, getStaticPathsPost } from '../../serverRender/postServerRender';
import { FormatDatePT_BR } from '../../utils/dataUtils';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import React, { useEffect, useState } from 'react';
interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const [totalTimeReading, setTotalTimeReading] = useState(0);

  useEffect(() => {
    let totalLetters = 0;
    post.data.content.forEach(content => {
      totalLetters += content.heading.length;
      content.body.forEach(body => {
        totalLetters += body.text.length;
      });
    });
    setTotalTimeReading(Math.floor(totalLetters / 265));
  }, [post]);

  return (
    <> 
      <div className={commonStyles.content}>
        <Header />
        <div className={styles.data}>
          <img
            alt={`Banner do post ${post.data.title}`}
            src={post.data.banner.url}
            width="400"
            height="250" />
          <h1>{post.data.title}</h1>
          <div className={styles.infos}>
            <AiOutlineCalendar className={styles.icon} />
            <time>{FormatDatePT_BR(new Date(post.first_publication_date))}</time>
            <AiOutlineUser className={styles.icon} />
            <span>{post.data.author}</span>
            <AiOutlineClockCircle className={styles.icon} />
            <span>{4} min</span>
          </div>
          <div className={styles.body}>
            {
              post.data.content.map((content, index) => (
                <div>
                  <h2>{content.heading}</h2>
                  {
                    content.body.map(body => <p>{body.text}</p>)
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths = getStaticPathsPost;
export const getStaticProps = getStaticPropsPost;