/*
* Main file js
*
* @author Andrey Chechkin
* @license GNU/AGPLv3
* @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
*/
"use strict";
const model = require("./model.js");
const view = require("./view.js");

window.onload = () => {
	model.login().then(() => {
		model.getFriends().then((res) => {
			view.renderFriends(res.response.items);
			view.renderFavorite(model.favoriteList);
		});
	});
}
