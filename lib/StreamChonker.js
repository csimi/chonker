const { Transform } = require('stream');
const BaseChonker = require('./BaseChonker');

module.exports = class StreamChonker extends BaseChonker(Transform, '_write') {};
