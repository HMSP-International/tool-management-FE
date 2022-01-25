import React from 'react';
import Dashboard from 'components/features/dashboard/admin';
import { useParams, Navigate } from 'react-router-dom';
import EmployeeDuties from './user/[_id]';

const DashboardPage: React.FC = () => {
	const { name } = useParams();

	if (name === 'admin') {
		return <Dashboard />;
	}
	else if (name === 'user') {
		return <EmployeeDuties />;
	}

	return Navigate({ to: 'notFound' });
};

export default DashboardPage;
