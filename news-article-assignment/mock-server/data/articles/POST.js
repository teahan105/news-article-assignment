const fs = require("fs");
const path = require("path");

module.exports = (request, response) => {
    // read file and make object
    const jsonPath = path.join(__dirname, "mockData.json");
    const articles = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    const payload = request.body;

    // new article
    const newArticle = {
        id: articles.length + 1,
        title: payload.title,
        description: payload.description,
        content: payload.content,
        createdAt: new Date().toISOString(),
        updatedAt: null,
        date: payload.date,
        author: "Author",
        imgSrc: "https://picsum.photos/200/300",
    };

    // add new article to the list
    articles.unshift(newArticle);

    //write file
    fs.writeFileSync(jsonPath, JSON.stringify(articles));

    return response.status(200).send(newArticle);
};
