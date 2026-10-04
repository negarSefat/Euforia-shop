import api from "../../../services/api";

export function getProducts() {
  return api.get("/products");
}
