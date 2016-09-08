/*
 * Main file for test JS code
 *
 * @author Andrey Chechkin
 * @license GNU/AGPLv3
 * @see {@link https://www.gnu.org/licenses/agpl-3.0.txt|License}
 */
"use strict";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const assert = chai.assert;
const expect = chai.expect;
require("mocha");

mocha.setup('bdd');
chai.use(chaiAsPromised);

const Model = require("../model.js");

describe("Vk friends list", () => {
	describe("Тестирование модели", () => {
		it("VK Auth", () => {
			return assert.isFulfilled(Model.login());
		});

		it("callVkApi", () => {
			return assert.isFulfilled(Model.callVkApi("friends.get", {v:5.53}));
		});
	});
});

window.onload = () => {
	mocha.run();
};
