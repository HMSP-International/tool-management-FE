import React, { useRef, useEffect } from 'react';
import { Form, Input } from 'antd';
import equal from 'deep-equal';
// Styled Components
import { PutCustomerDrawerStyled } from './putCustomerDrawer.styled';
import LoadingView from 'components/shared/loadingView/loadingView';
// Graphql
import { useMutation } from '@apollo/client';
import {
	CHANGE_INFO_CUSTOMER_BY_ADMIN_MUTATION,
	CHANGE_PASSWORD_CUSTOMER_BY_ADMIN_MUTATION,
} from 'apis/customers/mutations';
// interface
import { ICustomerDashboard } from 'slices/dashboard/interfaces';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onSubmit(putUser: ICustomerDashboard, type: string): void;
	customer: ICustomerDashboard;
}

const PutCustomerDrawer: React.FC<IProps> = ({ hidden, setHidden, onSubmit, customer }) => {
	const [ onChangeInformation, { loading: loadingI4 } ] = useMutation(CHANGE_INFO_CUSTOMER_BY_ADMIN_MUTATION);
	const [ onChangePassword, { loading: loadingPass } ] = useMutation(CHANGE_PASSWORD_CUSTOMER_BY_ADMIN_MUTATION);
	const [ form ] = Form.useForm();
	const btnI4Ref = useRef<HTMLButtonElement>(null);
	const btnPasswordRef = useRef<HTMLButtonElement>(null);
	// state
	useEffect(
		() => {
			form.setFieldsValue(customer);
		},
		[ customer, form ],
	);

	if (loadingI4 || loadingPass) return <LoadingView />;

	const onFinish = async () => {
		const values = form.getFieldsValue();
		values._id = customer._id;
		delete values.password;

		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onChangeInformation,
			variables: { changeInformationOfCustomerByAdminInput: values },
			message: 'Edited user',
		});

		if (!isError) {
			onSubmit(data, 'information');
		}
		setHidden(false);
	};

	const handleSubmitPassword = async () => {
		const newPassword = form.getFieldValue('password');

		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onChangePassword,
			variables: { changePasswordOfCustomerByAdminInput: { newPassword, _id: customer._id } },
			message: 'Changed password user',
		});

		if (isError) {
			form.setFieldsValue(customer);
		}
		else {
			onSubmit(data, 'password');
			setHidden(false);
		}
	};

	// event
	const handleChangeInput = () => {
		const newcustomer = form.getFieldsValue();
		const currentCustomer = customer;

		delete newcustomer.password;
		newcustomer.__typename = currentCustomer.__typename;
		newcustomer._id = currentCustomer._id;

		console.log(newcustomer);
		console.log(currentCustomer);

		const isMatched = equal(newcustomer, currentCustomer);

		if (isMatched) {
			if (btnI4Ref.current) {
				btnI4Ref.current.className = 'canNotSubmit';
			}
		}
		else {
			if (btnI4Ref.current) {
				btnI4Ref.current.className = 'canSubmit';
			}
		}
	};

	const handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;

		if (value.length >= 6) {
			if (btnPasswordRef.current) {
				btnPasswordRef.current.className = 'canSubmit';
			}
		}
		else {
			if (btnPasswordRef.current) {
				btnPasswordRef.current.className = 'canNotSubmit';
			}
		}
	};

	return (
		<PutCustomerDrawerStyled
			visible={hidden}
			placement={'right'}
			footer={null}
			onClose={() => setHidden(false)}
			closable={false}
			getContainer={false}
		>
			<Form
				name='basic'
				autoComplete='off'
				layout='vertical'
				form={form}
				onFinish={onFinish}
				onChange={handleChangeInput}
				className='create-new-user__drawer-form'
			>
				<div className='create-new-user__container'>
					<Form.Item label='Display Name' name='displayName'>
						<Input placeholder='David Vu' value='' />
					</Form.Item>
					<Form.Item
						label='Email'
						name='email'
						rules={[
							{
								type: 'email',
								message: 'The input is not valid E-mail!',
							},
						]}
					>
						<Input placeholder='huy@gmail.com' value='' />
					</Form.Item>
				</div>

				<Form.Item className='btn-submit'>
					<button type='submit' ref={btnI4Ref} className='canNotSubmit'>
						Update User
					</button>
				</Form.Item>

				<Form.Item
					label='Password'
					name='password'
					rules={[
						() => ({
							validator (_, value) {
								if (!value) return Promise.resolve();
								if (value.length < 6) {
									return Promise.reject('password has to be a length greater than 6.');
								}
								return Promise.resolve();
							},
						}),
					]}
				>
					<Input.Password placeholder='password' value='' onChange={handleChangePassword} />
				</Form.Item>

				<div className='btn-submit'>
					<span ref={btnPasswordRef} className='canNotSubmit' onClick={handleSubmitPassword}>
						Change Password
					</span>
				</div>
			</Form>
		</PutCustomerDrawerStyled>
	);
};

export default PutCustomerDrawer;
