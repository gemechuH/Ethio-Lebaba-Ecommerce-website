import React, { useEffect, useState } from "react";
import productData from "../../data/products.json";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";

const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRanges: [
    { label: "under $50", min: 0, max: 50 },
    { label: "$50-$100", min: 50, max: 100 },
    { label: "$100- $200", min: 0, max: 50 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [products, setProducts] = useState(productData);
  const [filterState, setFilterState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });
  //filter function
  const applyFilters = () => {
    let filteredProduct = productData;

    //filter category
    if (filterState.category && filterState.category != "all") {
      filteredProduct = filteredProduct.filter(
        (product) => product.category == filterState.category
      );
    }
    //filter color
    if (filterState.color && filterState.color != "all") {
      filteredProduct = filteredProduct.filter(
        (product) => product.color == filterState.color
      );
    }
    if (filterState.priceRange) {
      const [minPrice, maxPrice] = filterState.priceRange
        .split("-")
        .map(Number);
      filteredProduct = filteredProduct.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }
    setProducts(filteredProduct);
  };

  useEffect(() => {
    applyFilters();
  }, [filterState]);

  //clear filter
  const clearFilter = () => {
    setFilterState({
      category: "all",
      color: "all",
      priceRange: "",
    });
  };

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shoping Pages</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          dignissimos est sint assumenda reiciendis odit autem et maiores ullam
          labore
        </p>
      </section>
      <section className="section__container flex gap-12">
        {/* left side */}
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          <ShopFiltering
            filters={filters}
            filterState={filterState}
            setFilterState={setFilterState}
            clearFilter={clearFilter}
          />
        </div>
        <div>
          <h3 className="text-xl font-medium mb-4">
            {" "}
            products Avaiable: {products.length}
          </h3>
          <ProductCards products={products} />
        </div>
      </section>
    </>
  );
};

export default ShopPage;
