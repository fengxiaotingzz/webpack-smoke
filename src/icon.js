import React from "react";

export default function Icon({ path }) {
  console.log(path);
  return (
    <svg>
      <use xlinkHref={path} />
    </svg>
  );
}
