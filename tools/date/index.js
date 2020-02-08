const moment = require("moment");
require("moment-with-locales-es6");

Date.prototype.format = function(locale) {
  moment.locale(locale);
  return moment(this, "YYYY-MM-DDTHH:mm:ssZ").format("llll");
};
Date.prototype.fromNow = function(locale) {
  moment.locale(locale);
  return moment(this, "YYYY-MM-DDTHH:mm:ssZ").fromNow();
};

Date.prototype.textFormat = function(format, locale) {
  moment.locale(locale);
  return moment(this, "YYYY-MM-DDTHH:mm:ssZ").format(format);
};
