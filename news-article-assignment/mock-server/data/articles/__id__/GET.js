const fs = require("fs");
const path = require("path");

module.exports = (request, response) => {
    // read file and make object
    const jsonPath = path.join(__dirname, "../mockData.json");
    const articles = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    const { id } = request.params;

    const result = articles.find((article) => article.id === Number(id));

    if (!result) {
        return response.status(404).send("Not found");
    }

    return response.status(200).send(result);
};
