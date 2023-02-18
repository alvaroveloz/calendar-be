const moment = require('moment');

const isDate = ( value ) => {
    if (!value) {
        return false;
    }

    const validateDate =  moment(value);
    console.log({date: validateDate.isValid() })
    return validateDate.isValid();

}

module.exports = { isDate };