'use strict';

const httpError = (message, status) => {
	const err = new Error(message);
	err.status = status;
	console.log("ERROR", err.status);
	return err;
};

module.exports = {
	httpError,
};
