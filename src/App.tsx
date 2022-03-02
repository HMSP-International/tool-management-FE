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
import TaskDoingPage from 'pages/task-doing';
import VerifyPage from 'pages/verify';
import PrivateRouteLogined from 'components/shared/privateRoute/privateRouteLogined/privateRouteLogined';
import PrivateRouteMenu from 'components/shared/privateRoute/privateRouteMenu/privateRouteMenu';

// routes
import { mainRouterPage } from 'global/routes/page';
import Empty from 'pages/task-doing/empty';

function App () {
	return (
		<SocketContext.Provider value={socket}>
			<div className='app'>
				{/* Start Router */}
				<PrivateRouteMenu />

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

					<Route path={mainRouterPage.taskDoing.withProject} element={<TaskDoingPage />} />
					<Route path={mainRouterPage.taskDoing.index} element={<Empty />} />

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
