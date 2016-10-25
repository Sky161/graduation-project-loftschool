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

mocha.setup('bdd');
chai.use(chaiAsPromised);

const Model = require("../model.js");
const View = require("../view.js");

describe("Vk friends list", () => {
	describe("Тестирование model", () => {
		it("VK Auth", () => {
			return assert.isFulfilled(Model.login());
		});

		it("callVkApi", () => {
			return assert.isFulfilled(Model.callVkApi("friends.get", {v:5.53}));
		});

		it("getFriends", () => {
			return expect(Model.getFriends()).to.eventually.have.deep.property("response.count");
		});
	});
});

window.onload = () => {
	mocha.run();
};
