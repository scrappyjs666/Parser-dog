import axios from 'axios';

export const crudId = `62f24579b1098f15080f55a8`;

export const instance = axios.create({
  baseURL: `https://${crudId}.mockapi.io`,
});
