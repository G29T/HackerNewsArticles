const Article = ({articlesDetails}) => {
    return(
        <ul>
            {articlesDetails.map((article) => (
                <li key={article.id}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <a href={article.url}>{article.title}</a>
                        <span>
                            {article.score} by {article.by}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Article;
