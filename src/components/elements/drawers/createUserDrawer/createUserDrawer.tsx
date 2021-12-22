import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Select } from 'antd';
// Styled Components
import { CreateNewUserDrawerStyled } from './createUserDrawer.styled';
import LoadingView from 'components/shared/loadingView/loadingView';
// Graphql
import { CREATE_USER_MUTATION } from 'apis/users/mutations';
import { GET_ROLES_QUERY } from 'apis/roles/queries';
import { useMutation, useQuery } from '@apollo/client';
// interfaces
import { IRole } from 'slices/role/interfaces';
// redux
import { createUser } from 'slices/dashboard/slice';
import { useDispatch } from 'react-redux';
// helpers
import { fetchDataAndShowNotify } from 'global/helpers/graphql/fetchDataAndShowNotify';
import ErrorView from 'components/shared/errorView/errorView';
const { Option } = Select;

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const CreateUserDrawer: React.FC<IProps> = ({ hidden, setHidden }) => {
	const dispatch = useDispatch();
	const [ form ] = Form.useForm();
	const [ onCreateUser, { loading: loadingCreateUser } ] = useMutation(CREATE_USER_MUTATION);
	const { data, loading: loadingGetRoles, error } = useQuery(GET_ROLES_QUERY);
	// state
	const [ avatar, setAvatar ] = useState<string | ArrayBuffer>('');
	const [ roles, setRoles ] = useState<IRole[]>([]);
	// ref
	const btnRef = useRef<HTMLButtonElement>(null);

	useEffect(
		() => {
			if (!loadingGetRoles) {
				setRoles(data.getRoles);
			}
		},
		[ loadingGetRoles, data ],
	);

	if (loadingGetRoles || loadingCreateUser) return <LoadingView />;
	if (error) return <ErrorView error={error} />;

	const onFinish = async () => {
		const values = form.getFieldsValue();

		const { data, isError } = await fetchDataAndShowNotify({
			fnFetchData: onCreateUser,
			variables: { createUserInput: { ...values, avatar } },
			message: 'Created new user',
		});

		if (!isError) {
			dispatch(createUser(data));
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
		<CreateNewUserDrawerStyled
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
					<input placeholder='David Vu' type='file' onChange={handleChangeImage} name='avatar' />

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
					<Form.Item label='Title' name='title'>
						<Input placeholder='Web Developer' value='' />
					</Form.Item>

					<Form.Item label='Position' name='position'>
						<Input placeholder='Intership' value='' />
					</Form.Item>

					<Form.Item label='Department' name='department'>
						<Input placeholder='D2 - 510' value='' />
					</Form.Item>

					<Form.Item label='Role' name='_roleId'>
						<Select placeholder='Please select a role'>
							{roles.map((role: IRole) => (
								<Option key={role._id} value={role._id}>
									{role.name}
								</Option>
							))}
						</Select>
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
						Create User
					</button>
				</Form.Item>
			</Form>
		</CreateNewUserDrawerStyled>
	);
};

export default CreateUserDrawer;
