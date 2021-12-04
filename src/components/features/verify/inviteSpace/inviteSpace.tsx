import React, { useEffect } from 'react';
import LoadingView from '@components/shared/loadingView/loadingView';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { openNotification } from '@helpers/notification';
import { VERIFY_INVITE_SPACE_MUTATION } from '@apis/verify/mutations';
import { useMutation } from '@apollo/client';
import { handleApolloError } from '@helpers/apolloError';

interface IProps {
	token: string;
}

interface IDecode {
	exp: number;
}

const InviteSpace: React.FC<IProps> = ({ token }) => {
	const navigate = useNavigate();
	const [ onVerify, { loading } ] = useMutation(VERIFY_INVITE_SPACE_MUTATION);

	useEffect(
		() => {
			const handleVerifyInviteSpace = async () => {
				const { exp } = jwt_decode<IDecode>(token);
				if (Date.now() >= exp * 1000) {
					navigate('/');
					openNotification({ title: 'Token Expired', extensions: [] }, true);
				}
				else {
					try {
						const { data } = await onVerify({
							variables:
								{
									verifyInviteSpaceInput:
										{
											jwt: token,
										},
								},
						});

						console.log(data);
						navigate('/');
						openNotification({ title: 'Confirm Email Successfully', extensions: [] });
					} catch (error) {
						navigate('/');
						const showing = handleApolloError(error);
						openNotification(showing, true);
					}
				}
			};

			handleVerifyInviteSpace();
		},
		[ onVerify, token, navigate ],
	);

	if (loading) return <LoadingView />;
	return <LoadingView />;
};

export default InviteSpace;
