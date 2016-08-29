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
		if(localStorage.favoriteList) {
			let response = {};
			response.response = JSON.parse(localStorage.vkList);
			return response;
		} else {
			return vkApi.getApi("friends.get", {fields: "photo_50"})
		}
	}).then((response) => {
		let vkList = response.response
		let favoriteList = [];

		if(localStorage.favoriteList) {
			favoriteList = JSON.parse(localStorage.favoriteList);
		}

		let vkListContainer = document.querySelector("#friends-vk .list .body");
		let favoriteListContainer = document.querySelector("#favorite .list .body");
		let container = document.querySelector(".container");
		let saveBtn = document.querySelector("footer .btn")

		let tmpVklist = require("../jade/module-template/list-friends.jade");
		let tmpFavoriteList = require("../jade/module-template/list-favorite.jade");

		render(vkListContainer, {"items": vkList}, tmpVklist);
		render(favoriteListContainer, {"items": favoriteList}, tmpFavoriteList);

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

		const renderFavoriteList = (idElement) => {
			moveObj(idElement, vkList, favoriteList);
			render(favoriteListContainer, {"items": favoriteList}, tmpFavoriteList);
			render(vkListContainer, {"items": vkList}, tmpVklist);
		};

		container.addEventListener("click", function(e) {
			let thisTarget = e.target;
			let id = Number(thisTarget.parentElement.dataset.id);

			if(thisTarget.className === "add"){
				renderFavoriteList(id);
			}else if(thisTarget.className === "remove") {
				moveObj(id, favoriteList, vkList);
				render(favoriteListContainer, {"items": favoriteList}, tmpFavoriteList);
				render(vkListContainer, {"items": vkList}, tmpVklist);
			}
		});

		vkListContainer.addEventListener("mousedown", (e) => {
			let thisTarget = e.target.closest("li");
			if(!thisTarget || e.target.className === "add") return false;
			thisTarget.style.position = "absolute";
			thisTarget.style.zIndex = 100;
			let offsetX = e.offsetX;
			let offsetY = e.offsetY + vkListContainer.parentElement.scrollTop;
			let coordinats = container.parentElement.getBoundingClientRect();
			const move = (e) => {
				thisTarget.style.top = `${e.pageY - coordinats.top - offsetY}px`;
				thisTarget.style.left = `${e.pageX - coordinats.left - offsetX}px`;
			}

			move(e);

			thisTarget.getElementsByTagName("img")[0].ondragstart = () => { return false; }

			document.addEventListener("mousemove", (e) => {
				if(!thisTarget) return false;
				move(e);
			});

			document.addEventListener("mouseup", (e) => {
				let coordinatsDrop = favoriteListContainer.parentElement.getBoundingClientRect();
				let left = coordinatsDrop.left;
				let right = coordinatsDrop.left + coordinatsDrop.width
				let top = coordinatsDrop.top
				let bottom = coordinatsDrop.top + coordinatsDrop.height

				const resetDragable = () => {
					thisTarget.removeAttribute("style");
					thisTarget = null;
				}

				if((e.clientX > left && e.clientX < right) && (e.clientY > top && e.clientY < bottom)) {
					if(!thisTarget) return false;
					let id = Number(thisTarget.dataset.id);
					renderFavoriteList(id);
					resetDragable();
				}else{
					if(!thisTarget) return false;
					resetDragable();
				}
			});
		});

		saveBtn.addEventListener("click", (e) => {
			let favoriteListContainerInner = favoriteListContainer.getElementsByTagName("ul");

			if(favoriteListContainerInner[0] != undefined && favoriteListContainerInner[0].childElementCount > 0) {
				localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
				localStorage.setItem("vkList", JSON.stringify(vkList));
				alert("Сохранено!");
			} else {
				alert("Очищено!");
				localStorage.clear();
			}
		});

	}).catch((e) => { alert(`Ошибка: ${e.message}`); });
});
