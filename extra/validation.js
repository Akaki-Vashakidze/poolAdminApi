var {Validator, ValidationError} = require('express-json-validator-middleware');
var validator = new Validator({allErrors: true}),
  validate = validator.validate;

module.exports = {
  validate: function (schema) {
    let t = validate({body: schema});
    console.log();
  }
};
