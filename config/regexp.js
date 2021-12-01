module.exports = {
  MONGO_OBJECTID: /^[0-9a-f]{24}$/,
  PASS_REGEXP: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  MAC_ADR_REGEXP: /^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/
};
