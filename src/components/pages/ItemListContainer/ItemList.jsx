import { Card } from "../../common/card/Card";
import { Box, Skeleton } from "@mui/material";
import React from "react";

const ItemList = ({ items }) => {
  const loading = items.length === 0;

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        width="100%"
        p={3}
      >
        {loading
          ? [...Array(6)].map((_, index) => (
              <Box
                key={index}
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="200px"
                p={2}
                m={1}
                borderRadius={2}
                boxShadow={2}
                bgcolor="grey.200"
              >
                <Skeleton
                  variant="rectangular"
                  width={180}
                  height={120}
                  sx={{ mb: 1, borderRadius: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="80%"
                  height={30}
                  sx={{ mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  height={25}
                  sx={{ mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="50%"
                  height={20}
                  sx={{ mb: 2 }}
                />
                <Skeleton variant="rectangular" width="90%" height={40} />
              </Box>
            ))
          : items.map(({ id, title, price, stock, imageUrl }) => (
              <Card
                key={id}
                title={title}
                price={price}
                stock={stock}
                image={imageUrl}
                id={id}
              />
            ))}
      </Box>
    </>
  );
};

export default ItemList;
