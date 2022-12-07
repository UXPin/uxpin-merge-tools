interface Loaders {
  [loader: string]: string[];
}

interface LoadersConfig {
  [loader: string]: string[];
}

export const SUPPORTED_LOADERS: Loaders = {
  svg: ['svg-inline-loader'],
  sass: ['node-sass@4.14.1', 'style-loader@2.0.0', 'css-loader@3.6.0', 'sass-loader@7.3.0'],
  less: ['style-loader@2.0.0', 'css-loader@3.6.0', 'less-loader@4.1.0'],
  css: ['style-loader@2.0.0', 'css-loader@3.6.0'],
  url: ['url-loader'],
  file: ['file-loader'],
};

export const LOADERS_BASIC_CONFIG: LoadersConfig = {
  svg: ['{', '  test: /\\.svg$/,', "  loader: 'svg-inline-loader',", '},'],
  sass: [
    '{',
    '  test: /\\.s[ac]ss$/i,',
    '  use: [',
    "    'style-loader',",
    "    'css-loader',",
    "    'sass-loader',",
    '  ],',
    '},',
  ],
  file: ['{', '  test: /\\.(png|jpe?g|gif)$/i,', '  use: [', "    'file-loader',", '  ],', '},'],
  less: [
    '{',
    '  test: /\\.less$/i,',
    '  use: [',
    "    'style-loader',",
    "    'css-loader',",
    "    'less-loader',",
    '  ],',
    '},',
  ],
  url: [
    '{',
    '  test: /\\.(png|jpg|gif)$/i,',
    '  use: [',
    '    {',
    "      loader: 'url-loader',",
    '      options: {',
    '        limit: 8192',
    '      },',
    '    },',
    '  ],',
    '},',
  ],
  css: ['{', '  test: /\\.css$/i,', '  use: [', "    'style-loader',", "    'css-loader',", '  ],', '},'],
};
