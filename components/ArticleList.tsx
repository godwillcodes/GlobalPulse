import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Article {
  id: string; // Ensure that you have a unique identifier
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  author: string;
  url:  string;
}

interface Props {
  initialArticles: Article[];
  totalResults: number;
  currentPage: number;
  pageSize: number;
}

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/500?text=No+Image"; // Placeholder image URL

const ArticleList = ({ initialArticles, totalResults, currentPage, pageSize }: Props) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [visibleArticles, setVisibleArticles] = useState<Article[]>(initialArticles.slice(0, 3)); // Show initial 3 articles
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    async function fetchArticles(page: number) {
      try {
        console.log(`Fetching articles for page ${page} with pageSize ${pageSize}`);
        const response = await fetch(`/api/news?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched articles:', data);
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }

    fetchArticles(page);
  }, [page, pageSize]);

  const handleLoadMore = () => {
    console.log('Loading more articles...');
    setVisibleArticles(prev => {
      const nextPage = Math.ceil(prev.length / 3) + 1; // Calculate next page number
      const newArticles = articles.slice(0, nextPage * 3); // Get the next set of articles
      console.log('New articles to display:', newArticles);
      return newArticles;
    });
  };

  const totalPages = Math.ceil(totalResults / pageSize);
  console.log('Total pages:', totalPages);

  return (
    <div className="dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 lg:mt-10">
          {visibleArticles.map((article) => (
            <Link key={article.publishedAt} href={article.url}>
              <article className="relative flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700 overflow-hidden transition-transform transform hover:scale-105">
                <div className="relative h-48">
                  <img 
                    src={article.urlToImage || PLACEHOLDER_IMAGE} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                    onError={(e: any) => {
                      console.warn('Image failed to load:', e.target.src);
                      e.target.src = PLACEHOLDER_IMAGE;
                    }} // Fallback if image fails to load
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <time dateTime={article.publishedAt}>
                        {new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          weekday: 'long'
                        }).format(new Date(article.publishedAt))}
                      </time>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-gray-900 dark:text-gray-100">{article.title}</h3>
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">{article.description}</p>
                  </div>
                  <div className="mt-4 flex items-center border-t border-gray-200 dark:border-gray-700 pt-2">
                    <svg className="w-8 h-8 text-yellow-700 dark:text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
                    </svg>
                    <div className="ml-3 text-sm text-gray-900 dark:text-gray-100">{article.author || 'Unknown Author'}</div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {visibleArticles.length < totalResults && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 dark:bg-blue-600"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
