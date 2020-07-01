const helpers = require("./helpers");

helpers.ifEquals = function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
};
helpers.checklength = function (arg1, arg2, options) {
    if (arg1.length > arg2) {
        return options.fn(this);
    }
    return options.inverse(this);
};
helpers.count = function (carrito, id) {
    return (carrito[id] || 0);
};
helpers.subtotal = function (carrito, id, precio) {
    return Math.round((carrito[id] * precio ) * 100) / 100;
};
module.exports = helpers;