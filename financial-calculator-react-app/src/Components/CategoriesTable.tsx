import React from "react";
import { Category } from "../Data/interface.ts";
import DeleteButtonForm from "./DeleteButtonForm.tsx";
import UndeleteButtonForm from "./UndeleteButtonForm.tsx";
import EditCategoryComponent from "./EditCategoryComponent.tsx";

const CategoriesTable = ({
  categories,
  handleDeleteEntity,
  handleUpdateEntity,
}) => {
  return (
    <div className="table-wrapper-scroll-y my-custom-scrollbar">
      <table className="table table-bordered table-striped mb-0">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              Name
            </th>
            <th scope="col" className="text-center">
              Deleted
            </th>
            <th scope="col" className="text-center">
              Delete/Undelete
            </th>
            <th scope="col" className="text-center">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories?.map((category: Category) => {
              return (
                <tr key={category?.categoryId}>
                  <td className="text-center">{category?.name}</td>
                  <td className="text-center">
                    {category?.isDeleted ? "Deleted" : "Exist"}
                  </td>

                  <td className="text-center">
                    {!category.isDeleted ? (
                      <DeleteButtonForm
                        entityId={category.categoryId}
                        onSubmitFunction={handleDeleteEntity}
                      ></DeleteButtonForm>
                    ) : (
                      <UndeleteButtonForm
                        entityId={category.categoryId}
                        onSubmitFunction={handleDeleteEntity}
                      ></UndeleteButtonForm>
                    )}
                  </td>
                  <td className="text-center">
                    <EditCategoryComponent
                      category={category}
                      onSubmitUpdate={handleUpdateEntity}
                    ></EditCategoryComponent>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
