const moment = require("moment");
require("moment-with-locales-es6");
require('moment-timezone');
Date.prototype.format = function(locale) {
  moment().tz('Asia/Seoul');
  moment.locale(locale);
  return moment(this, "YYYY-MM-DDTHH:mm:ssZ").tz('Asia/Seoul')
  .format("llll");
};
Date.prototype.fromNow = function(locale) {
  moment.locale(locale);
  return moment(this, "YYYY-MM-DDTHH:mm:ssZ").tz('Asia/Seoul')
  .fromNow();
};

Date.prototype.textFormat = function(format, locale) {
  moment.locale(locale);
  return moment(this, "YYYY-MM-DDTHH:mm:ssZ").tz('Asia/Seoul')
  .format(format);
};
