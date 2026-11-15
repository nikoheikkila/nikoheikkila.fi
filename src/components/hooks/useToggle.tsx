import { useState } from "react";

type ReturnHook = [boolean, () => void];

export default function useToggle(isInitiallyOn?: boolean): ReturnHook {
	const [status, setStatus] = useState<boolean>(Boolean(isInitiallyOn));
	const toggleStatus = () => setStatus(!status);

	return [status, toggleStatus];
}
