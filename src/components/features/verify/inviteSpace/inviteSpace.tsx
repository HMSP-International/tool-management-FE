import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
// helpers
import { openNotification } from 'helpers/toastify/notification';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
// graphql
import { VERIFY_INVITE_SPACE_MUTATION } from 'apis/collaborators/mutations';
import { useMutation } from '@apollo/client';

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
					await fetchDataAndShowNotify({
						fnFetchData: onVerify,
						variables: { verifyInviteSpaceInput: { jwt: token } },
						message: 'Confirm Email Successfully',
					});

					navigate('/');
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
