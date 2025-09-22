// Mock CSS modules for testing
export default new Proxy(
	{},
	{
		get: (target, prop) => {
			if (prop === "__esModule") return true;
			if (prop === "default") return target;
			// Return the property name as the class name
			return prop.toString();
		},
	},
);
