// CONFIG defaults (aka PRODUCTION)
// WARNING: No test/stage/dev/development config should
// live here.

const path = require('path');
const defer = require('config/defer').deferConfig;

const appName = process.env.NODE_APP_INSTANCE || null;
const validAppNames = [
  'upcoming',
];

// Throw if the appName supplied is not valid.
if (appName && validAppNames.indexOf(appName) === -1) {
  throw new Error(`App ${appName} is not enabled`);
}

const apiHost = 'https://mods.usetopscore.com';

module.exports = {
  appName,
  basePath: path.resolve(__dirname, '../'),

  // The canonical list of enabled apps.
  validAppNames,

  // The node server host and port.
  serverHost: '127.0.0.1',
  serverPort: 4000,

  apiHost,
  apiPath: '/api',
  apiBase: defer((cfg) => cfg.apiHost + cfg.apiPath),

  // The keys listed here will be exposed on the client.
  // Since by definition client-side code is public these config keys
  // must not contain sensitive data.
  clientConfigKeys: [
    'apiBase',
  ],

  // Content security policy.
  CSP: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        apiHost,
        'https://cdn.usetopscore.com',
        'https://d36m266ykvepgv.cloudfront.net',
      ],
      imgSrc: [
        "'self'",
        'https://cdn.usetopscore.com',
        'https://d36m266ykvepgv.cloudfront.net',
      ],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      reportUri: '/__cspreport__',
    },

    // Set to true if you only want browsers to report errors, not block them
    reportOnly: false,

    // Set to true if you want to blindly set all headers: Content-Security-Policy,
    // X-WebKit-CSP, and X-Content-Security-Policy.
    setAllHeaders: false,

    // Set to true if you want to disable CSP on Android where it can be buggy.
    disableAndroid: false,
  },

};
