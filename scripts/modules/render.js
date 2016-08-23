/*
* Function from render js
*
* @author Andrey Chechkin
* @license GNU/AGPLv3
* @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
*/
"use strict";

module.exports = (selector, data, template) => {
	let htmlTmp = template(data);
	selector.innerHTML = htmlTmp;
}
