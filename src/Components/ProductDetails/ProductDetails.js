import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import { IoPeopleOutline } from 'react-icons/io5';
import { CreateContextData } from '../../Contexts/ContextData';
import './ProductDetails.css';

function ProductDetails() {
  const path = useLocation().pathname;
  const id = path.substring(9);
  console.log(id);
  const { data } = useContext(CreateContextData);

  const getProduct = data.filter((item) => item.id === parseInt(id))[0];
  console.log(getProduct);
  if (getProduct) {
    return (
      <div className="product-details">
        <img src={getProduct.image} alt="product-pic" />
        <div className="details-container">
          <div>
            <h3>Name</h3>
            <p>{getProduct.title}</p>
          </div>
          <div>
            <h3>Price</h3>
            <p>{getProduct.price}</p>
          </div>
          <div>
            <h3>Description</h3>
            <p>{getProduct.description}</p>
          </div>
          <div>
            <h3>Category</h3>
            <p>{getProduct.category}</p>
          </div>
          <div>
            <h3>Rating</h3>
            <div>
              <input
                type="range"
                min="0"
                max="5"
                value={getProduct.rating.rate}
                disabled
                title={getProduct.rating.rate}
              />
              <span>
                <IoPeopleOutline />
                {getProduct.rating.count}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="product-details">
        <h1>Unable to find Item of this id.</h1>
      </div>
    );
  }
}

export default ProductDetails;
