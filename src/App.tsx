import { Route, Routes, Navigate } from 'react-router-dom';
import { SocketContext, socket } from './socketIO/context';
// pages
import HomePage from './pages';
import AuthPage from './pages/auth';
import DashboardStaffPage from './pages/dashboard-staff';
import EmployeeDutiesPage from './pages/employee-duties';
import ManagePage from './pages/manage';

import NotFound from './pages/notFound';
import ProfilePage from './pages/profile';
import VerifyPage from './pages/verify';
import Menu from 'components/features/menu/menu';
import PrivateRouteLogined from 'components/shared/privateRoute/privateRouteLogined/privateRouteLogined';

// routes
import { mainRouterPage } from 'global/routes/page';

function App () {
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
