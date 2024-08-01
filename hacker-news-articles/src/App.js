import './App.css';
import Article from './components/article/Article';
import React, {useState, useEffect} from 'react';

let PAGE_SIZE = 10;

function App() {
  const [articlesDetails, setArticlesDetails] = useState([]);
    const [articlesIds, setArticlesIds] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);


    useEffect(() => {
        fetchArticlesDetails(page);
    }, [page])

    const fetchArticlesIdsPerPage = async (currentPage) => {
        let ids = articlesIds;
    
        if(!ids){
          try{
            const data = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
            ids = await data.json();
            setArticlesIds(ids);
          } catch (error) {
            console.log("Failed due to " + error);
          }
        }
    
        const start = currentPage * PAGE_SIZE;
        const end = start + PAGE_SIZE;
    
        return ids.slice(start, end);
    
    }
    
    const fetchArticlesDetails = async (currentPage) => {
      const articlesIds = await fetchArticlesIdsPerPage(currentPage);
      setIsLoading(true);
  
      const detailsPerPage = await Promise.all(
          articlesIds.map((articleId) => (
              fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json`)
              .then((res) => res.json())
          ))
      );
  
      setArticlesDetails([...articlesDetails, ...detailsPerPage]);

      setIsLoading(false);
    }

    return (
        <div>
          <h1 className="title">Hacker News</h1>
          {articlesIds == null ? (
            <p className="loading">Loading...</p>
          ) : (
            <div>
              <div role="list">
                <Article articlesDetails={articlesDetails}/>
              </div>
              {articlesDetails.length > 0 &&
                page * PAGE_SIZE + PAGE_SIZE <
                articlesIds.length && (
                  <button
                    className="load-more-button"
                    disabled={isLoading}
                    onClick={() => setPage(page + 1)}>
                    {isLoading
                      ? 'Loading...'
                      : 'Load more jobs'}
                  </button>
                )}
            </div>
          )}
        </div>
    )
}

export default App;
