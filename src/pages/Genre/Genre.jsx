import React from "react";
import { useParams } from "react-router-dom";

const Genre = () => {
  const { type } = useParams();
  console.log(type);
  return (
    <>
      <p className="text-3xl">GENRE: {type.toUpperCase()}</p>
    </>
  );
};

export default Genre;
