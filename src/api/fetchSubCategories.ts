import {api} from '.';

export async function fetchSubCategories(id: number) {
  return api.post('/subcategory', {category_id: id});
}
