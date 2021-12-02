import { notification } from 'antd';

export const openNotification = (
	{ title, extensions = [] }: { title: string; extensions: any },
	err: Boolean = false,
) => {
	console.log(extensions);

	const description =
		extensions.length === 0
			? ''
			: extensions.reduce((result: string, message: string) => {
					return result + ' and ' + message;
				});

	const sender = {
		message: title,
		description,
	};

	if (err) {
		notification.warn(sender);
	}
	else {
		notification.success(sender);
	}
};
