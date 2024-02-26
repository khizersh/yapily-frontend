import React, { useState, useEffect } from "react";

const TreatmentList = (props) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(props.list);
  }, [props.list]);

  return (
    <div className="container card">
      <div className="row">
        <div className="col-12">
          <h3 className="text-left text-black font-outfit">
            Following are the precautions/Treatment
          </h3>
        </div>
        <div className="col-12">
          <ul>
            {list.length
              ? list.map((prec) => <li className="text-black font-outfit">{prec}</li>)
              : " "}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TreatmentList;
