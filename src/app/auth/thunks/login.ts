import { createAsyncThunk } from '@reduxjs/toolkit';

const login = createAsyncThunk('auth/login', async ({ username, password }, thunkApi) => {
	try {
		const response: { data: [] } = { data: [] }; // from BE
		return response.data;
	} catch (err) {
		if (!err.response) {
			throw err;
		}
		return thunkApi.rejectWithValue(err.response.data);
	}
});

export default login;
