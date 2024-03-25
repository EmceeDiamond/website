import * as actions from './actionTypes.js';

export const addProvider = data => ({
  type: actions.PROVIDER_ADD,
  payload: data
});

export const updateProvider = data => ({
  type: actions.PROVIDER_UPDATE,
  payload: data
});

export const statusProvider = data => ({
  type: actions.PROVIDER_STATUS,
  payload: data
});

export const deleteProvider = (provider_id) => ({
  type: actions.PROVIDER_DELETE,
  payload: {provider_id}
});


export const addProduct = data => ({
  type: actions.PRODUCT_ADD,
  payload: data
});

export const deleteProduct = (element_id) => ({
  type: actions.PRODUCT_DELETE,
  payload: {element_id}
});

export const deleteProductProvider = (provider_id) => ({
  type: actions.PRODUCT_DELETE_PROVIDER,
  payload: {provider_id}
});

export const updateProduct = data => ({
  type: actions.PRODUCT_UPDATE,
  payload: data
});






