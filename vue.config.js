module.exports = {
    pages: {
        index: {
          entry: 'src/main.js',
          template: 'public/index.html',
          title: 'Allegro Model Test'
        }
    },
    publicPath: './',
    devServer: {
      watchOptions: {
        poll: true
      }
    }
};