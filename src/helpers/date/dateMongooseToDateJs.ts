export const dateMongooseToDateJs = (dateStr: Date): string => {
	const date = new Date(dateStr);

	const d = date.getDate();
	const m = date.getMonth() + 1;
	const y = date.getFullYear() + 1;

	return `${d}/${m}/${y}`;
};
