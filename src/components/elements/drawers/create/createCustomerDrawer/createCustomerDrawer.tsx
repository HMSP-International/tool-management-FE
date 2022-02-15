import React, { useRef, useState } from 'react';
import { Form, Input } from 'antd';
// Styled Components
import { CreateNewCustomerDrawerStyled } from './createCustomerDrawer.styled';
import LoadingView from 'components/shared/loadingView/loadingView';
// Graphql
import { useMutation } from '@apollo/client';
// interfaces
// redux
import { createCustomer } from 'slices/dashboard/slice';
import { useDispatch } from 'react-redux';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { CREATE_CUSTOMER_BY_ADMIN_MUTAIION } from 'apis/customers/mutations';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const CreateCustomerDrawer: React.FC<IProps> = ({ hidden, setHidden }) => {
	const [ form ] = Form.useForm();
	const dispatch = useDispatch();
	const [ onCreateCustomer, { loading: loadingCreateCustomer } ] = useMutation(CREATE_CUSTOMER_BY_ADMIN_MUTAIION);
	// state
	const [ avatar, setAvatar ] = useState<string | ArrayBuffer>('');
	// ref
	const btnRef = useRef<HTMLButtonElement>(null);

	if (loadingCreateCustomer) return <LoadingView />;

	const onFinish = async () => {
		const values = form.getFieldsValue();

		const { data, isError } = await fetchDataAndShowNotify({
			fnFetchData: onCreateCustomer,
			variables: { createCustomerByAdminInput: { ...values, avatar } },
			message: 'Created new customer',
		});

		if (!isError) {
			dispatch(createCustomer(data));
			setHidden(false);
		}
	};

	const handleChangeInput = () => {
		const values: Array<string | undefined> = Object.values(form.getFieldsValue());
		console.log(values);

		let canSubmit = true;

		for (let value of values) {
			if (!value || value.length <= 0) {
				canSubmit = false;
				break;
			}
		}

		if (canSubmit) {
			if (btnRef.current) {
				btnRef.current.className = 'canSubmit';
			}
		}
		else {
			if (btnRef.current) {
				btnRef.current.className = 'canNotSubmit';
			}
		}
	};

	const handleChangeImage = (e: any) => {
		let file = e.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = function () {
			if (reader.result) {
				setAvatar(reader.result);
			}
		};
	};

	return (
		<CreateNewCustomerDrawerStyled
			visible={hidden}
			placement={'right'}
			footer={null}
			onClose={() => setHidden(false)}
			closable={false}
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
					<div className='custom-file-upload'>
						<label htmlFor='avatar'>Avatar</label>
						<input placeholder='David Vu' type='file' onChange={handleChangeImage} name='avatar' />
					</div>

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

					<Form.Item
						label='Password'
						name='password'
						rules={[
							{
								message: 'Please enter your password',
							},
							() => ({
								validator (_, value) {
									if (value.length < 6) {
										return Promise.reject('password has to be a length greater than 6.');
									}
									return Promise.resolve();
								},
							}),
						]}
					>
						<Input.Password placeholder='password' value='' />
					</Form.Item>
				</div>

				<Form.Item className='btn-submit'>
					<button type='submit' ref={btnRef} className='canNotSubmit'>
						Create Customer
					</button>
				</Form.Item>
			</Form>
		</CreateNewCustomerDrawerStyled>
	);
};

export default CreateCustomerDrawer;
