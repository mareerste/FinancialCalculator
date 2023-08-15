import React, { useState, useEffect } from "react";
import { Category } from "../Data/interface.ts";
import {
  GetAllCategories,
  DeleteCategory,
} from "../Services/CategoryService.ts";
import AddCategoryComponent from "./AddCategoryComponent.tsx";
import CategoriesTable from "./CategoriesTable.tsx";
import SearchFieldComponent from "./SearchFieldComponent.tsx";
import TableFooterSection from "./TableFooterSection.tsx";

const CategoriesContent = ({ title, message }) => {
  const [categories, setCategories] = useState<Category>([]);
  const [searchCategories, setSearchCategories] = useState<Category>([]);

  useEffect(() => {
    GetAllCategories()
      .then((res) => {
        setCategories(res);
        setSearchCategories(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteEntity = (categoryId: string) => {
    DeleteCategory(categoryId).then((res) => {
      if (res === 200) {
        const index = categories.findIndex(
          (category) => category.categoryId === categoryId
        );

        if (index !== -1) {
          const updatedCategories = [...categories];
          updatedCategories[index].isDeleted =
            !updatedCategories[index].isDeleted;

          setCategories(updatedCategories);
          setSearchCategories(updatedCategories);
        }
      }
    });
  };

  const handleOnSubmitCategory = (newCategory: Category) => {
    var newList = [...categories, newCategory];
    setCategories(newList);
  };

  const handleUpdateEntity = (updateCategory: Category) => {
    const index = categories.findIndex(
      (category) => category.categoryId === updateCategory.categoryId
    );

    if (index !== -1) {
      const updatedCategories = [...categories];
      updatedCategories[index] = updateCategory;

      setCategories(updatedCategories);
      setSearchCategories(updatedCategories);
    }
  };

  const handleSearchFilter = (text: string) => {
    if (text === "") {
      setSearchCategories(categories);
    } else {
      const newList = categories.filter((category) =>
        category.name.toLowerCase().includes(text.trim().toLowerCase())
      );
      setSearchCategories(newList);
    }
  };

  return (
    <>
      <br />
      <div
        className="container mb-5 main-content"
        style={{ padding: "5vh", minHeight: "60vh" }}
      >
        <h2 className="text-center">
          {title}
          <span>
            <br />
          </span>
          <small className="text-muted">{message}</small>
        </h2>
        <hr />

        <TableFooterSection>
          <SearchFieldComponent
            text={"Search categories:"}
            onChange={(text) => handleSearchFilter(text)}
          ></SearchFieldComponent>
        </TableFooterSection>
        {searchCategories.length > 0 && (
          <>
            <CategoriesTable
              categories={searchCategories}
              handleDeleteEntity={handleDeleteEntity}
              handleUpdateEntity={handleUpdateEntity}
            ></CategoriesTable>
          </>
        )}
        <TableFooterSection>
          <AddCategoryComponent
            onSubmitCategory={(category) => handleOnSubmitCategory(category)}
          ></AddCategoryComponent>
        </TableFooterSection>
      </div>
    </>
  );
};

export default CategoriesContent;
