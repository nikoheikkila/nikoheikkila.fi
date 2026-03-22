(function () {
	"use strict";

	function initMenu() {
		var burgerButton = document.querySelector(".bm-burger-button");
		var overlay = document.querySelector(".bm-overlay");
		var menuWrap = document.querySelector(".bm-menu-wrap");

		if (!burgerButton || !overlay || !menuWrap) {
			return;
		}

		function openMenu() {
			menuWrap.style.display = "block";
			overlay.style.display = "block";
			menuWrap.setAttribute("aria-hidden", "false");
		}

		function closeMenu() {
			menuWrap.style.display = "none";
			overlay.style.display = "none";
			menuWrap.setAttribute("aria-hidden", "true");
		}

		closeMenu();

		burgerButton.addEventListener("click", openMenu);

		burgerButton.addEventListener("keydown", function (event) {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				openMenu();
			}
		});

		overlay.addEventListener("click", closeMenu);

		document.addEventListener("keydown", function (event) {
			if (event.key === "Escape") {
				closeMenu();
			}
		});
	}

	document.addEventListener("DOMContentLoaded", initMenu);
})();
