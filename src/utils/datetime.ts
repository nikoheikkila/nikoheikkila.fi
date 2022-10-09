import dayjs from "dayjs";

type DateInput = string | number | Date | null | undefined;

const formats = {
    human: "MMMM D, YYYY",
    machine: "YYYY-MM-DD",
};

export const toDisplay = (input?: DateInput): string =>
    dayjs(input).format(formats.human);

export const toISOString = (input?: DateInput): string =>
    dayjs(input).format(formats.machine);
