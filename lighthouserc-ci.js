module.exports = {
    ci: {
      collect: {
        startServerCommand: "npm run serve-dist",
        isSinglePageApplication: true,
        numberOfRuns: 3,
        url: [
          "http://localhost:5000",
        ],
      },
      assert: {
        assertions: {
          "categories:performance": ["error", { minScore: .5 }],
          "categories:accessibility": ["error", { minScore: .7 }],
          "categories:best-practices": ["error", { minScore: .7 }],
          "categories:seo": ["error", { minScore: .9 }],
          "categories.pwa": "off",
        },
      },
      upload: {
        target: "temporary-public-storage",
      },
    },
};

