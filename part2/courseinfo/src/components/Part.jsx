import React from "react";

const Part = ({ name, exercises, id }) => {
  return (
    <p>
      {name} {exercises} {id}
    </p>
  );
};

export default Part;
