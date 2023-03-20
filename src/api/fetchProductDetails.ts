import {api} from '.';

export async function fetchProductDetails({
  slug,
  product_id,
}: {
  slug?: string;
  product_id?: string;
}) {
  console.log('🚀 ~ file: fetchProductDetails.ts:10 ~ product_id:', product_id);
  console.log('🚀 ~ file: fetchProductDetails.ts:10 ~ slug:', slug);
  const data = slug
    ? {
        slug: slug,
      }
    : {
        product_id: product_id,
      };
  console.log('🚀 ~ file: fetchProductDetails.ts:13 ~ data:', data);
  return api
    .post(slug ? '/product/detail' : '/single-product-detail', data)
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
