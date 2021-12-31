export const removeAfterSign = (email: string): string => {
	if (typeof email !== 'string') return email;

	const index = email.indexOf('@');

	if (index >= 0) {
		return email.substring(0, index);
	}
	else {
		return email;
	}
};
