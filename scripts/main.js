/*
* Main file js
*
* @author Andrey Chechkin
* @license GNU/AGPLv3
* @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
*/
"use strict";
const vkApi = require("./modules/vk-api");

document.addEventListener("DOMContentLoaded", () => {
	vkApi.login().then(() => {
		return vkApi.getApi("friends.get", {fields: "photo_50"})
	}).then((response) => {
		let tmp = require("../jade/module-template/list-friens.jade");

		let render = tmp({
			"items": response.response
		});

		document.querySelector("#friends-vk .list").innerHTML = render;

	}).catch((e) => { alert(`Ошибка: ${e.message}`); });
});
