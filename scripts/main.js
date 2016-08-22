/*
* Main file js
*
* @author Andrey Chechkin
* @license GNU/AGPLv3
* @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
*/
"use strict";
const vkApi = require("./modules/vk-api");
const render = require("./modules/render");
const search = require("./modules/search");

document.addEventListener("DOMContentLoaded", () => {
	let vkList, favoriteList;
	let tmp = require("../jade/module-template/list-friens.jade");

	vkApi.login().then(() => {
		return vkApi.getApi("friends.get", {fields: "photo_50"})
	}).then((response) => {
		vkList = response.response

		render("#friends-vk .list", {"items": vkList}, tmp);

		let container = document.querySelector(".container");

		container.addEventListener("input", function(e) {
			if(e.target.name === "search-friends") {
				let inpVal = e.target.value;

				let res = search(inpVal, vkList);
				render("#friends-vk .list", {"items": res}, tmp);
			}
		});

	}).catch((e) => { alert(`Ошибка: ${e.message}`); });
});
