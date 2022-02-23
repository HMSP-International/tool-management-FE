import { Route, Routes, Navigate } from 'react-router-dom';
import { SocketContext, socket } from './socketIO/context';
// pages
import HomePage from 'pages';
import AuthPage from 'pages/auth';
import DashboardCustomerPage from 'pages/dashboard-customer';
import DashboardManageCustomerPage from 'pages/dashboard-customer/[_customerId]';
import DashboardStaffPage from 'pages/dashboard-staff';
import EmployeeDutiesPage from 'pages/employee-duties';
import ManagePage from 'pages/manage';

import NotFound from 'pages/notFound';
import ProfilePage from 'pages/profile';
import VerifyPage from 'pages/verify';
import Menu from 'components/features/menu/menu';
import PrivateRouteLogined from 'components/shared/privateRoute/privateRouteLogined/privateRouteLogined';

// routes
import { mainRouterPage } from 'global/routes/page';

function App () {
	// console.log('- Login -> email: pdh@gmail.com - pass: 123456');
	// console.log('- Description Start->----------------------------');
	// console.log('- Using: Nestjs, Reactjs, Graphql, Redux toolkit, SocketIo, AntDesign');
	// console.log(`- The application makes task management like trello, jira,... .
	// 			Moreover, customers can add tasks such as fixing bugs
	// 			or requesting more functionality for our company
	// 			and know the progress of their requests`);
	// console.log('Description End->--------------------------------');
	// console.log('Note: If you see a long wait, the server is probably sleeping, please wait a moment');

	return (
		<SocketContext.Provider value={socket}>
			<div className='app'>
				{/* Start Router */}
				<Menu />
				<Routes>
					<Route
						path={mainRouterPage.home}
						element={
							<PrivateRouteLogined>
								<HomePage />
							</PrivateRouteLogined>
						}
					/>

					<Route path={mainRouterPage.auth.restOfAuth} element={<AuthPage />} />

					<Route
						path={mainRouterPage.dashboardStaff.index}
						element={
							<PrivateRouteLogined>
								<DashboardStaffPage />
							</PrivateRouteLogined>
						}
					/>

					<Route
						path={mainRouterPage.dashboardCustomer.index}
						element={
							<PrivateRouteLogined>
								<DashboardCustomerPage />
							</PrivateRouteLogined>
						}
					/>

					<Route
						path={mainRouterPage.dashboardCustomer.customerId}
						element={
							<PrivateRouteLogined>
								<DashboardManageCustomerPage />
							</PrivateRouteLogined>
						}
					/>

					<Route
						path={mainRouterPage.employeeDuties}
						element={
							<PrivateRouteLogined>
								<EmployeeDutiesPage />
							</PrivateRouteLogined>
						}
					/>

					<Route
						path={mainRouterPage.manage.withProject}
						element={
							<PrivateRouteLogined>
								<ManagePage />
							</PrivateRouteLogined>
						}
					/>

					<Route path={mainRouterPage.notFound} element={<NotFound />} />

					<Route
						path={mainRouterPage.profile.restOfRouters}
						element={
							<PrivateRouteLogined>
								<ProfilePage />
							</PrivateRouteLogined>
						}
					/>

					<Route
						path={mainRouterPage.verify}
						element={
							<PrivateRouteLogined>
								<VerifyPage />
							</PrivateRouteLogined>
						}
					/>

					<Route path={mainRouterPage.restOfRouters} element={<Navigate to={mainRouterPage.notFound} />} />
				</Routes>
				{/* End Router */}
			</div>
		</SocketContext.Provider>
	);
}

export default App;
