var dbConfig = require("../../dbConfig/db");

function Article(article) {
    this.articleName = article.articleName;
    this.articleTitle = article.articleTitle;
    this.content = article.content;
    this.read = article.read;
    this.comment = article.comment;
    this.createAt = article.createAt;
    this.isOrigin = article.isOrigin;
    this.isRecomment = article.isRecomment;
}

module.exports = Article;

dbConfig.pool.getConnection(function (err, connection) {
    Article.getArticleList = function (callback) {
        var getListSql = "SELECT * FROM article";
        connection.query(getListSql, function (err, result) {
            if (err) {
                return;
            }
            callback(err, result);
        })
    }
});