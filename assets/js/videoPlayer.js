/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("var video = document.querySelector(\"video\");\nvar playBtn = document.getElementById(\"play\");\nvar muteBtn = document.getElementById(\"mute\");\nvar time = document.getElementById(\"time\");\nvar volume = document.getElementById(\"volume\");\n\nvar handlePlayClick = function handlePlayClick(e) {\n  //만약 비디오가 재생되고 있으면 일시정지\n  if (video.paused) {\n    playBtn.innerText = \"Play\";\n    video.play();\n  } else {\n    //아니면 재생\n    playBtn.innterText = \"Pause\";\n    video.pause();\n  }\n};\n\nvar handleMute = function handleMute(e) {};\n\nconsole.log(\"I'm VIDEO PLAYER\");\nplayBtn.addEventListener(\"click\", handlePlayClick);\nmuteBtn.addEventListener(\"click\", handleMute); // video.addEventListener(\"pause\", handlePause);\n// video.addEventListener(\"play\", handlePlay);\n\n//# sourceURL=webpack://sandspoons/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;