const { pipeline, PassThrough } = require('stream');
const { expect } = require('chai');
const sinon = require('sinon');
const { StreamChonker } = require('../../lib');
const separators = require('../fixtures/separators');
const chunks = require('../fixtures/chunks');

describe('StreamChonker', () => {
	for (const separator of separators) {
		it(`chonks stream with separator char ${separator ? separator.charCodeAt(0) : 'void'}`, async () => {
			const chonker = new StreamChonker(separator);
			const done = sinon.spy();
			const spy = sinon.spy();
			const source = new PassThrough();
			const destination = new PassThrough();
			
			destination.on('data', (data) => spy(String(data)));
			pipeline(
				source,
				chonker,
				destination,
				done,
			);
			chunks(chonker.separator).forEach(source.write.bind(source));
			source.end();
			
			await new Promise((resolve) => setTimeout(resolve, 0));
			
			return (
				expect(spy).to.have.been.calledThrice &&
				expect(spy).to.have.been.calledWith('foo') &&
				expect(spy).to.have.been.calledWith('bar') &&
				expect(spy).to.have.been.calledWith('€') &&
				expect(done).to.have.been.called &&
				expect(done).to.have.not.been.calledWith(sinon.match.instanceOf(Error))
			);
		});
	}
});
