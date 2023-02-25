import {api} from '.';

export async function fetchSubCategoryWiseProducts(id: number) {
  return api.post('/subcategory', {category_id: id});
}
