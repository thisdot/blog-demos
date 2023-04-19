import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

/**
 * Maps a key value object to HTML attributes.
 *
 * @param {object} attributes
 */
const makeHtmlAttributes = (attributes) => {
  if (!attributes) {
    return '';
  }

  const keys = Object.keys(attributes);
  return keys.reduce(
    (result, key) => (result += ` ${key}="${attributes[key]}"`),
    ''
  );
};

/**
 * Generates an index.html file that pulls in and initializes our bundle.
 *
 * @param {object} options
 */
const indexHtmlTemplate = async ({ attributes, files, publicPath, title }) => {
  const description = 'A WebGL morph target progressive web application demo.';

  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${publicPath}${fileName}" ${attrs}></script>`;
    })
    .join('\n');

  const links = (files.css || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.link);
      return `<link href="${publicPath}${fileName}" rel="stylesheet" ${attrs}>`;
    })
    .join('\n');

  // FIXME: Temporary cdn url to three.js should be replaced. This exists since
  // we're migrating from an old version that doesn't support modules yet.

  const indexHtml = `
    <!DOCTYPE html>
    <html ${makeHtmlAttributes(attributes.html)}>
      <head>
        <meta charset="utf-8">
        <meta name="description" content="${description}" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>${title}</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: Montserrat,sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-font-smoothing: antialiased;
            -o-font-smoothing: antialiased;
          }

          ginger-app {
            height: 100vh;
          }

          @supports (-webkit-appearance:none) {
            ginger-app {
              height: calc(100vh - 56px);
            }
          }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
        <link href="/static/images/icon.png" rel="shortcut icon" type="image/x-icon">
        ${links}
        ${scripts}
        <script>
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/service-worker.js');
            });
          }
        </script>
      </head>
      <body>
        <ginger-app></ginger-app>
      </body>
    </html>
  `;

  return indexHtml.replace(/\s+/g, ' ').trim();
};

export default [
  {
    input: './index.js',
    output: {
      file: './dist/bundle.rollup.js',
      format: 'iife',
      name: 'ginger',
    },
    plugins: [
      resolve({
        browser: true,
        jsnext: true,
        extensions: ['.js', '.json'],
      }),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      babel({
        extensions: ['.js'],
        presets: [],
        // Three.js is ignored as babel takes millennia to process it, probably
        // being caused by a bug.
        ignore: ['node_modules/three'],
        env: {
          production: {
            presets: ['@babel/preset-env', 'minify'],
          },
        },
      }),
      cleanup({ comments: 'none' }),
      html({
        title: 'Ginger',
        publicPath: '/',
        attributes: {
          html: { lang: 'en' },
          link: null,
          script: { type: 'module' },
        },
        template: indexHtmlTemplate,
      }),
      copy({
        targets: [
          { src: 'static', dest: 'dist' },
          { src: 'manifest.json', dest: 'dist' },
        ],
      }),
    ],
  },
  {
    input: './service-worker.js',
    output: {
      file: './dist/service-worker.js',
      format: 'iife',
      name: 'sw',
    },
    plugins: [
      resolve({
        browser: true,
        jsnext: true,
        extensions: ['.js', '.json'],
      }),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      babel({
        extensions: ['.js'],
        presets: [],
        // Three.js is ignored as babel takes millennia to process it, probably
        // being caused by a bug.
        ignore: ['node_modules/three'],
        env: {
          production: {
            presets: ['@babel/preset-env', 'minify'],
          },
        },
      }),
      cleanup({ comments: 'none' }),
    ],
  },
];
