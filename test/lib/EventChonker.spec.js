const { expect } = require('chai');
const sinon = require('sinon');
const { EventChonker } = require('../../lib');
const separators = require('../fixtures/separators');
const chunks = require('../fixtures/chunks');

describe('EventChonker', () => {
	for (const separator of separators) {
		it(`chonks events with separator char ${separator ? separator.charCodeAt(0) : 'void'}`, () => {
			const chonker = new EventChonker(separator);
			const spy = sinon.spy();
			
			chonker.on('data', (data) => spy(String(data)));
			chunks(chonker.separator).forEach(chonker.write.bind(chonker));
			
			return (
				expect(spy).to.have.been.calledThrice &&
				expect(spy).to.have.been.calledWith('foo') &&
				expect(spy).to.have.been.calledWith('bar') &&
				expect(spy).to.have.been.calledWith('€')
			);
		});
	}
});
