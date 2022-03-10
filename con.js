import {transform} from "cjstoesm";
(async _=> {

console.log(await transform({
	input: "gameold.js",
	outDir: "game.js"
}))

})()