/*
* Function from search in object
*
* @author Andrey Chechkin
* @license GNU/AGPLv3
* @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
*/
"use strict";

module.exports = (searchVal, obj) =>{
	let searchObj = obj.filter((item) => {
		let fullname = item.first_name + ' ' + item.last_name;

		if(fullname.toLowerCase().indexOf(searchVal.toLowerCase()) != -1){
			return item
		}
	});

	return searchObj;
}
