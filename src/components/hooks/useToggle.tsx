import { useState } from "react";

type ReturnHook = [boolean, () => void];

export default function (initialValue?: boolean): ReturnHook {
	const [status, setStatus] = useState<boolean>(Boolean(initialValue));
	const toggleStatus = () => setStatus(!status);

	return [status, toggleStatus];
}
