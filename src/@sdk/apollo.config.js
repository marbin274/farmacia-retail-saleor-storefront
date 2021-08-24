module.exports = {
  client: {
    includes: ["./queries/*.ts", "./mutations/*.ts", "./fragments/*.ts"],
    service: {
      name: "saleor",
      url: "https://backend-qa.farmauna-matata.com/graphql/"
    }
  }
};
