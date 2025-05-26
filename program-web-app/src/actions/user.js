import { client } from './client'

class ResultOperation {
    data;
    error;
}

export const getUsers = async () => {
    const result = new ResultOperation;

    await client({
        url: '/User/GetAll',
        method: 'GET'
    }).then(response => {
        result.data = response.data;
    }).catch(response => {
        result.error = response.error;
        console.log(response.error);
    });
    return result;
}

export const getUserById = async (id) => {
    const result = new ResultOperation;

    await client({
        url: `/User/GetById/?id=${id}`,
        method: 'GET'
    }).then(response => {
        result.data = response.data;
    }).catch(response => {
        result.error = response.error;
        console.log(response.error);
    });
    return result;
}

export const createUser = async (item) => {
    const result = new ResultOperation;

    await client({
        url: '/User/Add',
        method: 'POST',
        data: item
    }).then(response => {
        result.data = response.data;
    }).catch(response => {
        result.error = response.error;
        console.log(response.error);
    });
    return result;
}

export const loginUser = async (item) => {
    const result = new ResultOperation;

    await client({
        url: '/User/Login',
        method: 'POST',
        data: item
    }).then(response => {
        result.data = response.data;
    }).catch(response => {
        result.error = response.error;
        console.log(response.error);
    });
    return result;
}

export const updateUser = async (item) => {
    const result = new ResultOperation;

    await client({
        url: '/User/Update',
        method: 'PUT',
        data: item
    }).then(response => {
        result.data = response.data;
    }).catch(response => {
        result.error = response.error;
        console.log(response.error);
    });
    return result;
}

export const deleteUser = async (id) => {
    const result = new ResultOperation;

    await client({
        url: `/User/Delete/?id=${id}`,
        method: 'DELETE'
    }).then(response => {
        result.data = response.data;
    }).catch(response => {
        result.error = response.error;
        console.log(response.error);
    });
    return result;
}