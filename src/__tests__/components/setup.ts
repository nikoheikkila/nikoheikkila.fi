import { beforeEach } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();

beforeEach(() => {
	document.body.innerHTML = "<html lang='en' />";
});
