
/**
 * This middleware generates svg captcha.
*/

const svgCaptcha = require('svg-captcha');

exports.captcha = async (req, res, next) => {
  try {
    const captcha = svgCaptcha.create({});
    req.session.captcha = captcha.text;

    res.type('svg');
    res.status(200).send(captcha.data);
  } catch (error) {
    next(error);
  }
};
