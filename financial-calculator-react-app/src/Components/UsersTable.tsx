import React from "react";
import { userRoles, username } from "../Data/data.ts";
import { User } from "../Data/interface.ts";
import { formatDateTime } from "../Helper/HelperFunction.ts";
import DeleteButtonForm from "./DeleteButtonForm.tsx";
import ShowUserComponent from "./ShowUserComponent.tsx";
import UndeleteButtonForm from "./UndeleteButtonForm.tsx";

const UsersTable = ({ users, handleShowUser, handleDeleteEntity }) => {
  return (
    <div className="table-wrapper-scroll-y my-custom-scrollbar">
      <table className="table table-bordered table-striped mb-0">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              Username
            </th>
            <th scope="col" className="text-center">
              Mail
            </th>
            <th scope="col" className="text-center">
              Birth date
            </th>
            <th scope="col" className="text-center">
              Role
            </th>
            <th scope="col" className="text-center">
              Deleted
            </th>
            <th scope="col" className="text-center">
              Delete/Undelete
            </th>
            <th scope="col" className="text-center">
              Show
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.map((user: User) => {
              return (
                <tr key={user?.userId}>
                  <td className="text-center">{user?.username}</td>
                  <td className="text-center">{user?.mail}</td>
                  <td className="text-center">
                    {formatDateTime(user?.birthDate)}
                  </td>
                  <td className="text-center">{userRoles[user?.role]}</td>
                  <td className="text-center">
                    {user?.isDeleted ? "Deleted" : "Exist"}
                  </td>

                  <td className="text-center">
                    {user?.username !== sessionStorage.getItem(username) &&
                      (!user.isDeleted ? (
                        <DeleteButtonForm
                          entityId={user.userId}
                          onSubmitFunction={handleDeleteEntity}
                        />
                      ) : (
                        <UndeleteButtonForm
                          entityId={user.userId}
                          onSubmitFunction={handleDeleteEntity}
                        />
                      ))}
                  </td>
                  <td className="text-center">
                    <ShowUserComponent
                      title={"Users information"}
                      user={user}
                      editable={false}
                      onSubmitUpdate={(user) => console.log(user)}
                    ></ShowUserComponent>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
