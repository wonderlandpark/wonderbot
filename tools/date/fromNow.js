const moment = require("moment");
require("moment-with-locales-es6");
module.exports = locale => {
  moment.locale(locale);
  return moment(this, "YYYY-MM-DDTHH:mm:ssZ").fromNow();
};
