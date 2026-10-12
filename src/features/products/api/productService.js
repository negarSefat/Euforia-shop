import { useParams } from "react-router-dom";
import api from "../../../services/api";

export function getProducts(searchParam) {
  if (searchParam) {
    return api.get(`/products`, {
      params: {
        "title:contains": searchParam, // json-server v1 syntax: products whose title contains the param
      },
    });
  } else return api.get(`/products`);
}

export function getProductById(id) {
  return api.get(`/products/${id}`);
}
