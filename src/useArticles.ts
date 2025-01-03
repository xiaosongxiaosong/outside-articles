import { useState, useCallback, useEffect } from 'react';

interface Article {
  id: string;
  title: string;
  summary: string;
  time: string;
  image: string;
  tags: string[];
  link: string;
}

export function useArticles() {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('./articles/2024.json')
      .then(response => response.json())
      .then(data => {
        setAllArticles(data);
        setArticles(data);
      });
  }, []);

  const filterArticles = useCallback((query: string) => {
    if (!query) {
      setArticles(allArticles);
      return;
    }

    const filtered = allArticles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setArticles(filtered);
  }, [allArticles]);

  return {
    articles,
    filterArticles,
  };
}
