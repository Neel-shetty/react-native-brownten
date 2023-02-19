import {api} from '.';

export async function fetchCategories() {
  return api.post('/all/categories');
}
