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
const moveObj = require("./modules/move-object");

document.addEventListener("DOMContentLoaded", () => {
	vkApi.login().then(() => {
		return vkApi.getApi("friends.get", {fields: "photo_50"})
	}).then((response) => {
		let vkList = response.response
		let favoriteList = [];

		let vkListContainer = document.querySelector("#friends-vk .list");
		let favoriteListContainer = document.querySelector("#favorite .list");
		let container = document.querySelector(".container");

		let tmpVklist = require("../jade/module-template/list-friends.jade");
		let tmpFavoriteList = require("../jade/module-template/list-favorite.jade");

		render(vkListContainer, {"items": vkList}, tmpVklist);

		container.addEventListener("input", function(e) {
			let inpVal = e.target.value;
			if(e.target.name === "search-friends") {
				let res = search(inpVal, vkList);
				render(vkListContainer, {"items": res}, tmpVklist);
			}else if(e.target.name === "search-favorite") {
				let res = search(inpVal, favoriteList);
				render(favoriteListContainer, {"items": res}, tmpFavoriteList);
			}
		});

		container.addEventListener("click", function(e) {
			let thisTarget = e.target;
			let id = Number(thisTarget.parentElement.dataset.id);

			if(thisTarget.className === "add"){
				moveObj(id, vkList, favoriteList);
				render(favoriteListContainer, {"items": favoriteList}, tmpFavoriteList);
				render(vkListContainer, {"items": vkList}, tmpVklist);
			}else if(thisTarget.className === "remove") {
				moveObj(id, favoriteList, vkList);
				render(favoriteListContainer, {"items": favoriteList}, tmpFavoriteList);
				render(vkListContainer, {"items": vkList}, tmpVklist);
			}
		});

		vkListContainer.addEventListener("mousedown", (e) => {
			let thisTarget = e.target.closest("li");
			if(!thisTarget) return false;
			thisTarget.style.position = "absolute";
			let offsetX = e.offsetX;
			let offsetY = e.offsetY;
			let coordinats = container.parentElement.getBoundingClientRect();
			const move = (e) => {
				thisTarget.style.top = `${e.pageY - coordinats.top - offsetY}px`;
				thisTarget.style.left = `${e.pageX - coordinats.left - offsetX}px`;
			}

			move(e);

			container.addEventListener("mousemove", (e) => {
				if(!thisTarget) return false;
				move(e);
			});

			document.addEventListener("mouseup", (e) => {
				if(!thisTarget) return false;
				thisTarget.removeAttribute("style");
			});
		});

	}).catch((e) => { alert(`Ошибка: ${e.message}`); });
});
