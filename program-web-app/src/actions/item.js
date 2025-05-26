import { client } from 'client'

class ResultOperation {
    data;
    error;
}

export const getItems = async () => {
    const result = new ResultOperation;

    await client({
        url: '/Item/GetAll',
        method: 'GET'
    }).then(response => {
        result.data = response.data;
    }).catch(response => {
        result.error = response.error;
        console.log(response.error);
    });
    return result;
}

export const getItemById = async (id) => {
    const result = new ResultOperation;

    await client({
        url: `/Item/GetById/?id=${id}`,
        method: 'GET'
    }).then(response => {
        result.data = response.data;
    }).catch(response => {
        result.error = response.error;
        console.log(response.error);
    });
    return result;
}

export const createItem = async (item) => {
    const result = new ResultOperation;

    await client({
        url: '/Item/Add',
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

export const updateItem = async (item) => {
    const result = new ResultOperation;

    await client({
        url: '/Item/Update',
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

export const deleteItem = async (id) => {
    const result = new ResultOperation;

    await client({
        url: `/Item/Delete/?id=${id}`,
        method: 'DELETE'
    }).then(response => {
        result.data = response.data;
    }).catch(response => {
        result.error = response.error;
        console.log(response.error);
    });
    return result;
}