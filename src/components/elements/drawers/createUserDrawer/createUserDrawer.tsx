import React, { useRef } from 'react';
import { Form, Input } from 'antd';
// Styled Components
import { CreateNewUserDrawerStyled } from './createUserDrawer.styled';
import LoadingView from '../../../shared/loadingView/loadingView';
// Graphql
import { CREATE_USER_MUTATION } from '../../../../apis/dashboard/mutations';
import { useMutation } from '@apollo/client';
// interface
import { IUser } from '../../../../slices/dashboard/interfaces';
import { openNotification } from '../../../../global/helpers/notification';
import { handleApolloError } from '../../../../global/helpers/apolloError';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onSubmit(newUser: IUser): void;
}

const CreateUserDrawer: React.FC<IProps> = ({ hidden, setHidden, onSubmit }) => {
	const [ onCreateUser, { loading } ] = useMutation(CREATE_USER_MUTATION);
	const [ form ] = Form.useForm();
	const btnRef = useRef<HTMLButtonElement>(null);

	if (loading) return <LoadingView />;

	const onFinish = async () => {
		try {
			const values = form.getFieldsValue();
			const { data } = await onCreateUser({ variables: { createUserInput: values } });

			onSubmit(data.createUser);
			setHidden(false);

			const showing = {
				title: 'Susscess',
				extensions: [ 'Created new user' ],
			};
			openNotification(showing);
		} catch (error) {
			const showing = handleApolloError(error);
			openNotification(showing, true);
		}
	};

	const handleChangeInput = () => {
		const values: Array<string | undefined> = Object.values(form.getFieldsValue());
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
										return Promise.reject(
											'password has to be a length greater than 6.',
										);
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
