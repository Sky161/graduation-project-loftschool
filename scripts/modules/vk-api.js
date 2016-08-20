/*
* Main file js
*
* @author Andrey Chechkin
* @license GNU/AGPLv3
* @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
*/
"use strict";

let login = () => {
	return new Promise((resolve, reject) => {
		VK.init({
			apiId: 5597966
		});

		VK.Auth.login((response) => {
			if(response.status === "connected") {
				resolve(response);
			} else {
				reject(new Error(`Пользователь не авторизован!`));
			}
		}, 2);

	});
}

let getApi = (nameMethod, param) => {
	return new Promise((resolve, reject) => {
		VK.api(nameMethod, param, (response, reject) => {
			if(response) {
				resolve(response);
			} else{
				reject(new Error("Ошибка"));
			}
		});
	});
}

module.exports = { login, getApi }
