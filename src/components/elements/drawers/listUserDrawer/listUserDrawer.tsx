import React from 'react';
// Redux
import { useSelector } from 'react-redux';
// css
import { ListUserDrawerStyled } from './listUserDrawer.styled';
// interfaces
import { RootState } from '../../../../global/redux/rootReducer';
import { IInitialStateDashboard } from '../../../../slices/dashboard/interfaces';
// graphql
import {} from '../../../../apis/users/mutations'

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const ListUserDrawer: React.FC<IProps> = ({ hidden, setHidden }) => {
	const dashboardRedux: IInitialStateDashboard = useSelector(
		(state: RootState) => state.dashboard,
	);

	return (
		<ListUserDrawerStyled
			visible={hidden}
			placement={'left'}
			footer={null}
			onClose={() => setHidden(false)}
			closable={false}
		>
			{dashboardRedux.users.map(user => <p key={user._id}>{user.email}</p>)}
		</ListUserDrawerStyled>
	);
};

export default ListUserDrawer;
