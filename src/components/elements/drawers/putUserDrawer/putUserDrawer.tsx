import React, { useEffect, useRef } from 'react';
import { Form, Input } from 'antd';
import equal from 'deep-equal';
// Styled Components
import { PutUserDrawerStyled } from './putUserDrawer.styled';
import LoadingView from '../../../shared/loadingView/loadingView';
// Graphql
import { useMutation } from '@apollo/client';
import {
	CHANGE_INFORMATION_BY_ADMIN_MUTAIION,
	CHANGE_PASSWORD_BY_ADMIN_MUTAIION,
} from '../../../../apis/users/mutations';
// interface
import { IUser } from '../../../../slices/dashboard/interfaces';
import { openNotification } from '../../../../global/helpers/notification';
import { handleApolloError } from '../../../../global/helpers/apolloError';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onSubmit(putUser: IUser, type: string): void;
	user: IUser;
}

const PutUserDrawer: React.FC<IProps> = ({ hidden, setHidden, onSubmit, user }) => {
	const [ onChangeInformation, { loading: loadingI4 } ] = useMutation(
		CHANGE_INFORMATION_BY_ADMIN_MUTAIION,
	);
	const [ onChangePassword, { loading: loadingPass } ] = useMutation(
		CHANGE_PASSWORD_BY_ADMIN_MUTAIION,
	);
	const [ form ] = Form.useForm();
	const btnI4Ref = useRef<HTMLButtonElement>(null);
	const btnPasswordRef = useRef<HTMLButtonElement>(null);

	useEffect(
		() => {
			form.setFieldsValue(user);
		},
		[ form, user ],
	);

	if (loadingI4 || loadingPass) return <LoadingView />;

	const onFinish = async () => {
		try {
			const values = form.getFieldsValue();
			values._id = user._id;
			delete values.password;

			const { data } = await onChangeInformation({
				variables: { changeInformationInputByAdmin: values },
			});

			onSubmit(data.chageInformationByAdmin, 'information');
			setHidden(false);

			const showing = {
				title: 'Susscess',
				extensions: [ 'Edited user' ],
			};
			openNotification(showing);
		} catch (error) {
			const showing = handleApolloError(error);
			form.setFieldsValue(user);
			openNotification(showing, true);
		}
	};

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

	const handleSubmitPassword = async () => {
		const newPassword = form.getFieldValue('password');

		try {
			const { data } = await onChangePassword({
				variables:
					{
						changePasswordInputByAdmin:
							{
								newPassword,
								_id: user._id,
							},
					},
			});

			onSubmit(data.changePasswordInputByAdmin, 'password');
			setHidden(false);

			const showing = {
				title: 'Susscess',
				extensions: [ 'Changed password user' ],
			};
			openNotification(showing);
		} catch (error) {
			const showing = handleApolloError(error);
			form.setFieldsValue(user);
			openNotification(showing, true);
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

					<Form.Item label='Role' name='role'>
						<Input placeholder='Admin' value='' />
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
									return Promise.reject(
										'password has to be a length greater than 6.',
									);
								}
								return Promise.resolve();
							},
						}),
					]}
				>
					<Input.Password
						placeholder='password'
						value=''
						onChange={handleChangePassword}
					/>
				</Form.Item>

				<div className='btn-submit'>
					<span
						ref={btnPasswordRef}
						className='canNotSubmit'
						onClick={handleSubmitPassword}
					>
						Change Password
					</span>
				</div>
			</Form>
		</PutUserDrawerStyled>
	);
};

export default PutUserDrawer;
