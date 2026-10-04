import api from "../../../services/api";

export function getProducts() {
  return api.get("/products");
}

export function getProductById(id) {
  return api.get(`/products/${id}`);
}
