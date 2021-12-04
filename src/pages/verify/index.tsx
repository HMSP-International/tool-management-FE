import * as React from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import InviteSpace from '@components/features/verify/inviteSpace/inviteSpace';

const VerifyPage: React.FC = () => {
	const { search } = useLocation();
	const params = useParams();

	const handleRouter = (): JSX.Element => {
		if (params.name === 'inviteSpace') {
			return <InviteSpace token={new URLSearchParams(search).get('token') || ''} />;
		}
		return <Navigate to='notFound' />;
	};

	return <React.Fragment>{handleRouter()}</React.Fragment>;
};

export default VerifyPage;
