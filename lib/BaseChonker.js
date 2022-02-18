const { StringDecoder } = require('string_decoder');

const BaseChonker = (Super, write) => class extends Super {
	constructor (separator = '\n') {
		super();
		this.separator = separator;
		this.separatorLength = separator.length;
		this.decoder = new StringDecoder('utf8');
		this.buffer = '';
	}
	
	[write] (chunk, encoding, callback) {
		const data = this.decoder.write(chunk);
		this.buffer += data;
		this.chonk();
		if (typeof callback === 'function') {
			callback();
		}
	}

	chonk () {
		let fromIndex = 0;
		let toIndex;
		while ((toIndex = this.buffer.indexOf(this.separator, fromIndex)) !== -1) {
			this.push(this.buffer.slice(fromIndex, toIndex));
			fromIndex = toIndex + this.separatorLength;
		}
		if (fromIndex) {
			this.buffer = this.buffer.slice(fromIndex);
		}
	}
};

module.exports = BaseChonker;
