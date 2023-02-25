import {api} from '.';

export async function fetchHomeSubCategories() {
  return api.post('/home/subcategory');
}
