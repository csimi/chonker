module.exports = (separator) => [
	Buffer.from('fo'),
	Buffer.from(`o${separator}bar${separator}`),
	Buffer.from([0xE2]),
	Buffer.from([0x82]),
	Buffer.from([0xAC]),
	Buffer.from(`${separator}no`),
];
