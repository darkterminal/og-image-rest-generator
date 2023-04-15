const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require("compression");

const middlewares = require('./middlewares');
const { seoBanner } = require('./nodecanvas');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  exposedHeaders: ['Cross-Origin-Resource-Policy']
}));
app.use((req, res, next) => {
  res.set('Cross-Origin-Resource-Policy', 'same-site');
  next();
})
app.use(express.json());
app.use(compression());

app.get('/', (req, res) => {
  res.json({
    message:
      "Create OG:IMAGE Banner Image with Github Action & REST API - use /seo-banner endpoint to generate your image and get image/png result",
    templates: {
      detail: 'You can choose available template. (Default is: default)',
      data: [
        'default',
        'facebook',
        'facebook-minimal',
        'twitter',
        'twitter-minimal',
        'instagram',
        'instagram-minimal',
        'linkedin',
        'linkedin-minimal',
        'pinterest',
      ]
    }
  });
});
app.get('/seo-banner', seoBanner)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
