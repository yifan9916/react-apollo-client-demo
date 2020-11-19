module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  const isDev = !api.env('production');

  const presets = [
    [
      '@babel/env',
      {
        corejs: 3.6,
        useBuiltIns: 'usage',
      },
    ],
    '@babel/typescript',
    '@babel/react',
  ];

  const plugins = [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/syntax-dynamic-import',
    // avoid including react-refresh code in the node environment
    isDev && 'react-refresh/babel',
  ].filter(Boolean);

  return { presets, plugins };
};
