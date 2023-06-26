module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mov|mp4)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next",
          name: "static/media/[name].[hash].[ext]",
        },
      },
    });
    return config;
  },
};

module.exports = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  },
};

module.exports = {
  images: {
    formats: ['image/webp'],
  },
}

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};