'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
	const queryString = `SELECT
		c.*,
		u.name AS ownername
		FROM
		wop_cat AS c
		LEFT JOIN wop_user AS u
		ON
		c.owner = u.user_id` 
    const [rows] = await promisePool.query(queryString);
	//console.log(rows)
    return rows;
  } catch (e) {
		console.error('error', e.message);
  }
};

const getCat = async (catId, next) => {
	try{
	 	const [row] = await promisePool.execute(
			'SELECT * FROM wop_cat WHERE cat_id = ?',[catId]
		);
	console.log('get by id result?', row);
	return row[0];
	} catch(e) {
		console.error('error', e.message);
		const err = httpError('SQL error', 500);
		next(err);
	};
};

const insertCat = async (cat) => {
	try {
		const [row] = await promisePool.execute('INSERT INTO wop_cat (name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)', 
			[cat.name, cat.weight, cat.owner , cat.filename, cat.birthdate]);
		console.log('model insert cat',  row);
		return row.insertId;
	} catch (e) {
		console.error('model insert cat', e.message);
	};
};

const deleteCat = async (cat_id) => {
	try {
		const [row] = await promisePool.execute('DELETE FROM wop_cat WHERE cat_id = ?', [cat_id]);
		console.log('model delete cat', row);
		return row.affectedRows === 1;
	} catch (e) {
		console.error('model delete cat', e.message);
	}
};

const modifyCat = async (cat) => {
	try {
		let birthdate = (cat.birthdate).toString().substring(0,10);
		console.log("BIRTHDATE", birthdate);
		const [row] = await promisePool.execute('UPDATE wop_cat SET name = ?, weight = ?, owner = ?, birthdate = ? WHERE cat_id = ?',
			[cat.name, cat.weight, cat.owner, birthdate, cat.id]);
		console.log('model modify cat',  row);
		return row.affectedRows === 1;
	} catch (e) {
		console.error('model modify cat', e.message);
	};
};

module.exports = {
	getAllCats,
	getCat,
	insertCat,
	deleteCat,
	modifyCat,
};
