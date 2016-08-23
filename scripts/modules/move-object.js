/*
* Functions from work list items
*
* @author Andrey Chechkin
* @license GNU/AGPLv3
* @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
*/
"use strict";

module.exports = (id, objInner, objOuter) => {
	objInner.filter((item, i) => {
		if(item.uid === id) {
			objOuter.push(item);
			objInner.splice(i, 1);
		}
	});
}
