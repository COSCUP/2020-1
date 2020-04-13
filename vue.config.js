const path = require('path');
const fs = require('fs');

const gaTempHTML = fs.readFileSync(path.join(__dirname, './template/ga.html'));

const sessionData = require(path.join(__dirname, './public/json/session.json'));

const publicPath = process.env.NODE_ENV === 'production' ? '/2020/' : '/2020/'

const renderRoutes = (() => {
  const originalRoutes = [
    '',
    '/agenda',
    ...sessionData.sessions.filter((session) => '載入中…' !== session.id).map(session => (`/agenda/${session.id}`)),
    '/venue',
    '/traffic',
    '/staff',
    '/sponsor'
  ]
  const routes = []
  const languages = fs.readdirSync(path.join(__dirname, 'languages'))
    .filter((filename) => filename !== 'index.ts').map((filename) => filename.replace('.ts', ''))
  originalRoutes.forEach((originalRoute) => {
    const route = path.join(publicPath,originalRoute).toString()
    routes.push(route)
    routes.push(path.join(route, '/'))
    languages.forEach((language) => {
      const route = path.join(publicPath, language,originalRoute).toString()
      routes.push(route)
      routes.push(path.join(route, '/'))
    })
  })
  return routes
})()

module.exports = {
  publicPath,
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes,
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess: route => {
        // Auto inject GA template
        route.html = route.html
          .replace('<noscript>{{{ %GA_TEMPLATE% }}}</noscript>', gaTempHTML);
        return route;
      }
    }
  }
}
