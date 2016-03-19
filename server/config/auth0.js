//var AuthenticationClient = require('auth0').AuthenticationClient;

var jwt = require('express-jwt');
var auth0 = jwt({
  secret: new Buffer('f4AGFyYmmTJdzDMg4b4P6bwWYgacKvXI-5pbToxH0o_aSTI2qtEJ3Gx7ky1W6Qq4', 'base64'),
  audience: 'aTXYBsgnA1yrAUygOY138OilcGObKtCV'
});

module.exports = auth0;
