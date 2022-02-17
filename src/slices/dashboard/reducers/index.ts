// reducers
import { createCustomer } from './createCustomer';
import { createUser } from './createUser';
import { deleteCustomer } from './deleteCustomer';
import { deleteUser } from './deleteUser';
import { getCustomers } from './getCustomers';
import { getUsers } from './getUsers';
import { updateInformationCustomer } from './updateInformationCustomer';
import { updateInformationUser } from './updateInformationUser';

const reducers = {
	createCustomer,
	createUser,
	deleteCustomer,
	deleteUser,
	getCustomers,
	getUsers,
	updateInformationCustomer,
	updateInformationUser,
};

export default reducers;
