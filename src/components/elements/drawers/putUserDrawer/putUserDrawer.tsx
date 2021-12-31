import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Select } from 'antd';
import equal from 'deep-equal';
// Styled Components
import { PutUserDrawerStyled } from './putUserDrawer.styled';
import LoadingView from '../../../shared/loadingView/loadingView';
import ErrorView from 'components/shared/errorView/errorView';
// Graphql
import { useMutation, useQuery } from '@apollo/client';
import { CHANGE_INFORMATION_BY_ADMIN_MUTAIION, CHANGE_PASSWORD_BY_ADMIN_MUTAIION } from 'apis/users/mutations';
import { GET_ROLES_QUERY } from 'apis/roles/queries';
// interface
import { IRole } from 'slices/role/interfaces';
import { IUser } from 'slices/dashboard/interfaces';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';

const { Option } = Select;
interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onSubmit(putUser: IUser, type: string): void;
	user: IUser;
}

const PutUserDrawer: React.FC<IProps> = ({ hidden, setHidden, onSubmit, user }) => {
	const [ onChangeInformation, { loading: loadingI4 } ] = useMutation(CHANGE_INFORMATION_BY_ADMIN_MUTAIION);
	const [ onChangePassword, { loading: loadingPass } ] = useMutation(CHANGE_PASSWORD_BY_ADMIN_MUTAIION);
	const { data, loading: loadingGetRoles, error } = useQuery(GET_ROLES_QUERY);
	const [ form ] = Form.useForm();
	const btnI4Ref = useRef<HTMLButtonElement>(null);
	const btnPasswordRef = useRef<HTMLButtonElement>(null);
	// state
	const [ roles, setRoles ] = useState<IRole[]>([]);

	useEffect(
		() => {
			if (!loadingGetRoles) {
				console.log(data.getRoles);

				setRoles(data.getRoles);
			}
		},
		[ loadingGetRoles, data ],
	);

	useEffect(
		() => {
			form.setFieldsValue({ ...user, _roleId: user._roleId._id });
		},
		[ form, user ],
	);

	if (loadingI4 || loadingPass) return <LoadingView />;
	if (error) return <ErrorView error={error} />;

	const onFinish = async () => {
		const values = form.getFieldsValue();
		values._id = user._id;
		delete values.password;

		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onChangeInformation,
			variables: { changeInformationInputByAdmin: values },
			message: 'Edited user',
		});

		if (!isError) {
			onSubmit(data, 'information');
			setHidden(false);
		}
	};

	const handleSubmitPassword = async () => {
		const newPassword = form.getFieldValue('password');

		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onChangePassword,
			variables: { changePasswordInputByAdmin: { newPassword, _id: user._id } },
			message: 'Changed password user',
		});

		if (isError) {
			form.setFieldsValue(user);
		}
		else {
			onSubmit(data, 'password');
			setHidden(false);
		}
	};

	// event
	const handleChangeInput = () => {
		const newUser = form.getFieldsValue();
		const currentUser = user;

		delete newUser.password;
		newUser.__typename = currentUser.__typename;
		newUser._id = currentUser._id;

		const isMatched = equal(newUser, currentUser);

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
		<PutUserDrawerStyled
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
		</PutUserDrawerStyled>
	);
};

export default PutUserDrawer;
