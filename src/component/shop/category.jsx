import React, { useState } from "react";
import { Collapse } from "reactstrap";

const Category = () => {
   const categoryList = ""
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  // console.log(data.categoryList)

  return (
    <>
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleCategory}>
          Breed
        </h3>
        <Collapse isOpen={isCategoryOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="category-list">
                {Array.isArray(categoryList?.data) &&
                  categoryList?.data?.map((type, i) => (
                    <li key={i}>
                      <a>{type.title}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Category;
