import React from "react";

const ItemDetail = ({ title, description, imageUrl }) => {
  return (
    <div className="item-detail">
      <h1 className="item-title">{title}</h1>
      <img src={imageUrl} alt={title} className="item-image" />
      <p className="item-description">{description}</p>
    </div>
  );
};

export default ItemDetail;
