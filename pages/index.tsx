import { GetServerSideProps } from 'next';
import ArticleList from '../components/ArticleList';

interface Props {
  initialArticles: any[];
  totalResults: number;
  currentPage: number;
  pageSize: number;
}

const Home = ({ initialArticles, totalResults, currentPage, pageSize }: Props) => {
  return (
    <ArticleList
      initialArticles={initialArticles}
      totalResults={totalResults}
      currentPage={currentPage}
      pageSize={pageSize}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = 1, pageSize = 20 } = context.query;

  try {
    const res = await fetch(`http://localhost:3000/api/news?page=${page}&pageSize=${pageSize}`);
    const data = await res.json();

    return {
      props: {
        initialArticles: data.articles || [],
        totalResults: data.totalResults || 0,
        currentPage: parseInt(page as string, 20),
        pageSize: parseInt(pageSize as string, 20),
      },
    };
  } catch (error) {
    return {
      props: {
        initialArticles: [],
        totalResults: 0,
        currentPage: 1,
        pageSize: 20,
      },
    };
  }
};

export default Home;
