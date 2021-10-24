const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const path = require("path");

module.exports = {

    plugins: [
        autoprefixer,
        cssnano({ preset: 'default' })
    ]
};