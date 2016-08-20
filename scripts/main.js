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
		console.log(response);
	}).catch((e) => { alert(`Ошибка: ${e.message}`); });
});
