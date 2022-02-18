const { EventEmitter } = require('events');
const BaseChonker = require('./BaseChonker');

module.exports = class EventChonker extends BaseChonker(EventEmitter, 'write') {
	push (data) {
		this.emit('data', data);
	}
};
