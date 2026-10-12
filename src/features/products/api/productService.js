import api from "../../../services/api";

export function getProducts(searchParam, page = 1) {
  const params = {
    _page: page,
    _per_page: 8,
  };
  if (searchParam) {
    params["title:contains"] = searchParam;
  }
  return api.get(`/products`, {
    params,
  });
}

export function getProductById(id) {
  return api.get(`/products/${id}`);
}
