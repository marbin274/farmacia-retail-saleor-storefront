module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          }
        ],
      },
    ]
  },
  webpack: (config, _) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@farmatheme': '@farmacia-retail/farmauna-components/tailwind.config',
    };
    return config;
  },
};
