/*
 * Model object
 *
 * @author Andrey Chechkin
 * @license GNU/AGPLv3
 * @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
 */
"use strict";

class Model{
	constructor() {
		this.vkList = {};
		this.favoriteList = {};
	}

	login() {
		return new Promise((resolve, reject) => {
			VK.init({ apiId: 5597966 });

			VK.Auth.login((res) => {
				if(res.status === "connected") {
					resolve("connected");
				} else {
					reject(new Error(`Пользователь не авторизован!`));
				}
			}, 2);
		});
	}

	callVkApi(method, params) {
		return new Promise((resolve, reject) => {
			VK.Api.call(method, params, (res) => {
				if(res) {
					resolve(res);
				} else {
					reject(new Error("Ошибка в методе callVkApi"));
				}
			});
		});
	}

	getFriends() {
		return new Promise((resolve, reject) => {
			this.callVkApi("friends.get", {
				v: "5.53",
				fields: "photo_50"
			}).then((result) => {
				if(result) {
					this.vkList = result.response.items;
					resolve(result);
				} else {
					reject(new Error("Друзья не получены"));
				}

			})
		})
	}
}

module.exports = new Model();
