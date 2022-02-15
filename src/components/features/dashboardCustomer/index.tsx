import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Modal
import CreateNewCustomerDrawer from 'components/elements/drawers/create/createCustomerDrawer/createCustomerDrawer';
// components
import ContainerPage from 'components/shared/containerPage/containerPage';
import CustomersDashboard from 'components/elements/tables/customersDashboard/usersDashboard';
import { DashboardStyled } from './index.styled';
import LoadingView from 'components/shared/loadingView/loadingView';
// redux
import { getCustomers } from 'slices/dashboard/slice';
import { useDispatch } from 'react-redux';
// graphql
import { useMutation } from '@apollo/client';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { GET_CUSTOMERS_MUTAIION } from 'apis/customers/mutations';

const DashboardCustomer: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [ showCreateUserDrawer, setShowCreateUserDrawer ] = useState(false);

	const [ onGetCustomers, { loading } ] = useMutation(GET_CUSTOMERS_MUTAIION);

	useEffect(
		() => {
			const fetchUsers = async () => {
				const { data, isError } = await fetchDataAndShowNotify({
					fnFetchData: onGetCustomers,
					isNotShowNotify: true,
				});

				if (!isError) {
					dispatch(getCustomers(data));
				}
				else {
					navigate('/', { replace: true });
				}
			};

			fetchUsers();
		},
		[ onGetCustomers, dispatch, navigate ],
	);

	useEffect(
		() => {
			return () => {
				dispatch(getCustomers([]));
			};
		},
		[ dispatch ],
	);

	if (loading) return <LoadingView />;

	return (
		<React.Fragment>
			<ContainerPage title={'Dashboard Customer'}>
				<DashboardStyled>
					<div className='dashboard__add-new-user'>
						<button onClick={() => setShowCreateUserDrawer(true)}>Add new customer</button>
					</div>
					<CustomersDashboard />
				</DashboardStyled>
			</ContainerPage>

			{showCreateUserDrawer && (
				<CreateNewCustomerDrawer hidden={showCreateUserDrawer} setHidden={setShowCreateUserDrawer} />
			)}
		</React.Fragment>
	);
};

export default DashboardCustomer;
