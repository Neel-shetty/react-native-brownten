import {api} from '.';

export async function fetchAllCategories() {
  return api.post('/all/categories');
}
