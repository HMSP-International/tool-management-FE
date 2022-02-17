import React from 'react';
// graphql
import { useMutation } from '@apollo/client';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
// redux
import { useDispatch } from 'react-redux';
import { deleteCustomer } from 'slices/dashboard/slice';

// Styled Components
import { DeleteCustomerModalStyled } from './deleteCustomer.styled';
import { DELETE_CUSTOMER_MUTATION } from 'apis/customers/mutations';
interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	customer: {
		_id: string;
		email: string;
	};
}

const DeleteCustomerModal: React.FC<IProps> = ({ hidden, setHidden, customer }) => {
	// redux
	const dispatch = useDispatch();
	// graphql
	const [ onDeleteCustomer, { loading } ] = useMutation(DELETE_CUSTOMER_MUTATION);

	if (loading) return <LoadingView />;

	const handleDeleteCustomer = async (_id: string) => {
		const { data, isError } = await fetchDataAndShowNotify({
			fnFetchData: onDeleteCustomer,
			variables: { deleteCustomerInput: { _id } },
		});

		if (!isError) {
			dispatch(deleteCustomer(data));
			setHidden(false);
		}
	};

	return (
		<DeleteCustomerModalStyled
			centered
			visible={hidden}
			footer={null}
			className='modal__delete-user-modal'
			onCancel={() => setHidden(false)}
		>
			<div className='delete-user-modal__container'>
				<div className='delete-user-modal__question'>Are you sure delete </div>
				<div className='delete-user-modal__name'>{customer.email}</div>
				<div className='delete-user-modal__btn'>
					<button onClick={() => handleDeleteCustomer(customer._id)}>Delete</button>
				</div>
			</div>
		</DeleteCustomerModalStyled>
	);
};

export default DeleteCustomerModal;
