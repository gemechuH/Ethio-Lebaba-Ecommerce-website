import React, { useState } from "react";
import ProductCards from "../shop/ProductCards";
import products from '../../data/products.json'
const TrendingProduct = () => {
  const [visibleProducts, setVisibleProducts] = useState(4)
  const loadMore = () => {
    setVisibleProducts(prevCount => prevCount + 4)
    
  }
  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
        incidunt tenetur omnis repellat laboriosam ad sint perferendis nam,
        totam ut?
      </p>
      <ProductCards products={products.slice(0, visibleProducts)} />
      <div className="product__btn">
        {
          visibleProducts < products.length && ( <button onClick={loadMore} className="btn">Load More</button>)
        }
      </div>
    </section>
  );
};

export default TrendingProduct;
