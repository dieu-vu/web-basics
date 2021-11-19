'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

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

const insertUser = async (user) => {
	try {
		const [row] = await promisePool.execute('INSERT INTO wop_user (name, email, password, role) VALUES (?, ?, ?, ?)', 
			[user.name, user.email, user.passwd, 1]); 
		console.log('model insert user',  row);
		return row.insertId;
	} catch (e) {
		console.error('model insert user', e.message);
	};
};

module.exports = {
	getAllUsers, 
	getUser,
	insertUser,
	getUserLogin,
};
