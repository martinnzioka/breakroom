
/**
 * This middleware sets HTTP security headers to help prevent some common attack vectors:
   1. Strict-Transport-Security.
   2. X-frame-Options.
   3. X-XSS-Protection.
   4. X-Content-Type-Options.
   5. Content-Security-Policy.
   6. Cache-Control and Pragma.
   7. Expect-CT.
   8. Public-Key-Pins.
   9. Feature-Policy.
   10. Referrer-Policy.
 *
*/

const helmet = require('helmet');
const ExpectCertificateTransparency = require('expect-ct');

const csp = helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"], // default value for all directives that are absent
    scriptSrc: ["'self'"], // helps prevent XSS attacks
    frameAncestors: ["'none'"], // helps prevent Clickjacking attacks
    imgSrc: ["'self'"],
    styleSrc: ["'none'"],
  },
});

const expectCt = ExpectCertificateTransparency({
  enforce: true,
  maxAge: 30,
});

const referrerPolicy = helmet.referrerPolicy({
  policy: ['no-referrer', 'same-origin', 'strict-origin'],
});

const featurePolicy = helmet.featurePolicy({
  features: {
    fullscreen: ["'self'"],
  },
});


module.exports = {
  helmet, csp, expectCt, referrerPolicy, featurePolicy,
};
