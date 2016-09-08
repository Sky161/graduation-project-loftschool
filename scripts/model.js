/*
 * Model object
 *
 * @author Andrey Chechkin
 * @license GNU/AGPLv3
 * @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
 */
"use strict";

module.exports = {
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
	},

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
	},
};
