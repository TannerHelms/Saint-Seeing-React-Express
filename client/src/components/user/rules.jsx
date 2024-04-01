import React from "react";
const Rules = ({ user }) => {
  return user.rules.map((rule, idx) => (
    <div className="flex" key={idx}>
      <p>{idx + 1}</p>
      <p className="pl-4">{rule}</p>
    </div>
  ));
};

export default Rules;
