'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
	const queryString = `SELECT * FROM wop_user`
    const [rows] = await promisePool.query(queryString);
	console.log(rows)
    return rows;
  } catch (e) {
		console.error('error', e.message);
  }
};

const getUser = async (userId) => {
	try{
	 	const [row] = await promisePool.execute(
			'SELECT * FROM wop_user WHERE user_id = ?',[userId]
		);
	console.log('get by id result?', row);
	return row[0];
	} catch(e) {
		console.error('error', e.message);
	};
};
module.exports = {
	getAllUsers, 
	getUser,
};
