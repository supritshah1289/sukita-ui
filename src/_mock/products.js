import React from "react";

import { Grid } from "@mui/material";
import { useGetItemsQuery}
import moment from "moment";

let itemPostCreatedDate = moment(item.createdAt).format("MMMM Do YYYY");

const { data, isError, isLoading } = useGetItemsQuery();

const ItemsList = ({ items, isDelete }) => {
  return (
    id: items.id,
     cover: {
      items.uploads.length > 0
        ? `data:image/jpeg;base64,${item.uploads[0].image}`
      : ""
    },
    name: items.userDetails.name,
    price: items.price,
    priceSale: itemPostCreatedDate;
  };
  );
};



export default ItemsList;