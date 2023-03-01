import React, { FC, useState } from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
} from "@mui/material";

import ShopType from '../types/shop';
import ProductCard from './Product';

type ShopProps = {
  item: ShopType

};

const Shop: FC<ShopProps> = ({ item }: ShopProps): JSX.Element => {
  const [showProducts, setShowProducts] = useState<boolean>(false);

  const handleShowProducts = () => {
    setShowProducts(true);
  };

  const handleHideProducts = () => {
    setShowProducts(false);
  };

  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <CardHeader title={item.name} />
        <CardMedia component="img" height="280" image={item.img} alt="shopkeeper" />
        <CardActionArea>
          {showProducts ? (
            <div>
              <Button onClick={handleHideProducts}>Hide Products</Button>
              {item.products.map((product) => (
                <ProductCard key={product.id} item={product} />
              ))}
            </div>
          ) : (
            <Button onClick={handleShowProducts}>Show Products</Button>
          )}
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Shop;