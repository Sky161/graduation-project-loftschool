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
const controller = require("./controller.js");

window.onload = () => {
	model.login().then(() => {
		model.getFriends().then((res) => {
			view.renderFriends(model.vkList);
			view.renderFavorite(model.favoriteList);

			const main = document.body.querySelector(".container");
			const searchInp = main.querySelector("#search-friends");

			searchInp.addEventListener("input", (e) => {
				const val = e.target.value;
				controller.search(val, model.vkList, view.renderFriends);
			});
		});
	});
}
