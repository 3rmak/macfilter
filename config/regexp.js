module.exports = {
  PASS_REGEXP: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  MAC_ADR_REGEXP: /^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/
};
