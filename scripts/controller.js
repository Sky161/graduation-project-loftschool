/*
* class Controller
*
* @author Andrey Chechkin
* @license GNU/AGPLv3
* @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
*/
"use strict";
const view = require("./view.js");

class Controller {
	search(querySend, data, renderFn) {
		const query = querySend.toLowerCase();
		const res = data.filter((item) => {
			const fullName = item.first_name + " " + item.last_name;
			if(fullName.toLowerCase().indexOf(query) != -1) {
				return item;
			}
		});
		renderFn.call(view, res);
	}
}

module.exports = new Controller();
