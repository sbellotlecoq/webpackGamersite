const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '',
  },
  
  watch: true,

  module: {
    rules: [
        {
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: 'asset/resource',
          },

          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },

      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        // Pour le SASS :
        test: /\.(sa|sc|c)ss$/, // On applique notre règle aux fichiers .sass, .scss et .cs
        use: [
            {
                // On le met en tout premier, afin qu'il soit exécuté en dernier,
                // une fois que tous les changements souhaités sont appliqués à notre CSS.
                loader: MiniCssExtractPlugin.loader,
              },
          // Attention, les loaders sont ajoutés en sens inverse !!
          // Effectivement, c'est le dernier loader qui est exécuté en premier.
          // Donc celui-ci arrive en fin de chaîne :
          {
            loader: 'css-loader', // Ce loader permet d'utiliser url() et @import dans ton CSS
          },
          {
            // Ensuite on utilise le loader de postCSS, qui ajoutera un minifier par exemple,
            // ou bien un préfixeur automatique des règles CSS (--moz par exemple)
            loader: 'postcss-loader',
          },
          {
            // En premier, on transforme le SASS en CSS :
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
  
  mode: 'development'
};
