export const mainParamPage = {
	userId: '_userId',
	projectId: '_projectId',
	customerId: '_customerId',
	token: 'name',
};

export const pathNamePage = {
	auth: 'auth',
};

export const mainRouterPage = {
	home: '',
	dashboardStaff:
		{
			index: 'dashboard-staff',
		},
	employeeDuties: `employee-duties/:${mainParamPage.userId}`,
	manage:
		{
			withProject: `manage/:${mainParamPage.projectId}/*`,
			index: 'manage',
		},
	notFound: 'notFound',
	profile:
		{
			index: 'profile',
			restOfRouters: 'profile/*',
		},
	verify: `verify/:${mainParamPage.token}`,
	restOfRouters: '*',
	login: 'login',
	forgot: 'forgot',
	auth:
		{
			login: `${pathNamePage.auth}/login`,
			forgot: `${pathNamePage.auth}/forgot`,
			restOfAuth: `${pathNamePage.auth}/*`,
			index: `${pathNamePage.auth}`,
		},
	dashboardCustomer:
		{
			index: 'dashboard-customer',
			customerId: `dashboard-customer/:${mainParamPage.customerId}`,
		},
};
