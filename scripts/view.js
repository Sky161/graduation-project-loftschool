/*
* class View
*
* @author Andrey Chechkin
* @license GNU/AGPLv3
* @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
*/
"use strict";

class View {
	constructor() {
		this.tplFriend = require("../jade/module-template/list-friends.jade");
		this.tplFavorite = require("../jade/module-template/list-favorite.jade");
	}

	render(selector, tpl, data) {
		selector.innerHTML = tpl({items:data});
	}

	renderFriends(data) {
		const friendsContain = document.body.querySelector(".container #friends-vk .list .body");
		this.render(friendsContain, this.tplFriend, data);
	}

	renderFavorite(data) {
		const favoriteContain = document.body.querySelector(".container #favorite .list .body");
		this.render(favoriteContain, this.tplFavorite, data);
	}
}

module.exports = new View();
