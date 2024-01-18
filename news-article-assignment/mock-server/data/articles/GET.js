const fs = require("fs");
const path = require("path");

module.exports = (request, response) => {
    // read file and make object
    const jsonPath = path.join(__dirname, "mockData.json");
    const articles = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    const { page, perPage, textSearch } = request.query;

    const filterByTextSearch = articles.filter((el) => {
        if (textSearch) {
            const lowerCase = textSearch.toLowerCase();
            const titleHasIncludedText = el.title.toLowerCase().includes(lowerCase);
            const descHasIncludedText = el.description
                .toLowerCase()
                .includes(lowerCase);
            const contentHasIncludedText = el.content
                .toLowerCase()
                .includes(lowerCase);

            return (
                titleHasIncludedText || descHasIncludedText || contentHasIncludedText
            );
        }

        return true;
    });

    // parse query
    const parsePage = Number(page) || 1;
    const parsePerPage = Number(perPage) || 10; // default 10 articles per page

    const newArr = filterByTextSearch.slice(
        parsePage === 1 ? 0 : (parsePage - 1) * perPage,
        parsePage * parsePerPage
    );

    const mod = filterByTextSearch.length % parsePerPage === 0 ? 0 : 1;
    const totalPages = Math.floor(filterByTextSearch.length / parsePerPage) + mod;

    const result = {
        docs: newArr,
        page: parsePage,
        perPage: parsePerPage,
        totalDocs: filterByTextSearch.length,
        totalPages,
        hasNextPage: parsePage < totalPages,
    };

    return response.status(200).send(result);
};
