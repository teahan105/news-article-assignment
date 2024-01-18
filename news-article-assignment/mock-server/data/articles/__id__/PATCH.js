const fs = require("fs");
const path = require("path");

module.exports = (request, response) => {
    // read file and make object
    const jsonPath = path.join(__dirname, "../mockData.json");
    const articles = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    const payload = request.body;
    const articleId = request.params?.id;

    const result = articles.find((article) => article.id === Number(articleId));

    if (!result) {
        return response.status(404).send("Not found");
    }

    // new article
    const updatedArticle = {
        ...result,
        title: payload.title,
        description: payload.description,
        content: payload.content,
        date: payload.date,
        updatedAt: new Date().toISOString(),
    };

    const newArrArticles = articles.map((article) =>
        article.id === Number(articleId) ? updatedArticle : article
    );

    //write file
    fs.writeFileSync(jsonPath, JSON.stringify(newArrArticles));

    return response.status(200).send(updatedArticle);
};
