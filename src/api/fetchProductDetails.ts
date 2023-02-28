import {api} from '.';

export async function fetchProductDetails(slug: string) {
  return api
    .post('/product/detail', {slug: slug})
    .then(res => {
      if (res.data?.status === 1) {
        return res.data.data;
      }
    })
    .catch(error => {
      if (error?.response) {
        return error.response.data;
      }
    });
}
