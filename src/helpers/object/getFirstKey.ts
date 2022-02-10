export const getFirstKey = (data: any): any => {
	if (typeof data !== 'object') return data;

	const keys = Object.keys(data);
	const res = data[keys[0]];

	if (typeof res !== 'object') return data;

	return res;
};
