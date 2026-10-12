import Header from "../../component/layout/Header";
import Cards from "./Cards";
import ProductSearch from "./productSearch";

export default function Products() {
  return (
    <>
      <div
        style={{
          fontFamily: "causten",
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "center",
          marginTop: 50,
          marginBottom: 20,
        }}
      >
        Our Collection
      </div>

      <div className="flex justify-center mb-6">
        <ProductSearch />
      </div>
      <Cards />
    </>
  );
}
