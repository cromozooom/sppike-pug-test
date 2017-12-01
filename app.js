const axis = require('axis')
const rupture = require('rupture')
const autoprefixer = require('autoprefixer-stylus')

const Records = require('spike-records')		// JSON

//const SpikeDatoCMS = require('spike-datocms') // DATO CMS
const locals = {}

module.exports = {
  ignore: ['**/layout.pug', '**/_*', '**/.*', '_cache/**', 'readme.md', 'test/**', 'yarn.lock'],
  entry: { 'js/main': ['./assets/js/index.coffee'] },
  matchers: {
    html: '*(**/)*.pug',
    css: '*(**/)*.styl',
    js: '**/*.coffee'
  },

  module: {
    rules: [{
      test: /\.styl$/,
      use: [{
        loader: 'stylus-loader',
        options: {
          use: [axis(), rupture(), autoprefixer()]
        }
      }]
    }, {
      test: /\.pug$/,
      use: [{
        loader: 'pug-static-loader',
        options: {
          //pretty: true,
          //locals: { foo: 'bars' },
          //locals: () => locals
          locals
        }
      }]
    }, {
      test: /\.coffee$/,
      use: [{ loader: 'coffee-loader' }]
    }]
  },
  resolve: { extensions: ['.coffee', '.js'] },

  plugins: [
    new Records({
      addDataTo: locals,
      myData: { 
        file: '/data/data.json'
        //transform: (data) => data.menu
      },
      artworks: { 
        file: '/data/artworks.json'
        //transform: (data) => data.artworks
      },
    
      artworkData: {
        file: '/data/artworks.json',
        template: {
          //transform: (data) => { return data.artworks },
          path: 'templates/artwork.pug',
          output: (artwork) => { return `artwork/${artwork.idArtwork}.html` }
        }
      }
    })
  ]
}
