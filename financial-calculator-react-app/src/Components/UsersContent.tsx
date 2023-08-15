import React, { useState, useEffect } from "react";
import { User } from "../Data/interface.ts";
import { GetAllUsers, DeleteUser } from "../Services/UserService.ts";
import TableFooterSection from "./TableFooterSection.tsx";
import SearchFieldComponent from "./SearchFieldComponent.tsx";
import ValueButton from "./ValueButton.tsx";
import UsersTable from "./UsersTable.tsx";

const UsersContent = ({ title, message }) => {
  const [users, setUsers] = useState<User>([]);
  const [searchUsers, setSearchUsers] = useState<User>([]);

  useEffect(() => {
    GetAllUsers()
      .then((res) => {
        setUsers(res);
        setSearchUsers(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteEntity = (userId: string) => {
    DeleteUser(userId).then((res) => {
      if (res === 200) {
        const index = users.findIndex((user) => user.userId === userId);

        if (index !== -1) {
          const updatedUsers = [...users];
          updatedUsers[index].isDeleted = !updatedUsers[index].isDeleted;

          setUsers(updatedUsers);
          setSearchUsers(updatedUsers);
        }
      }
    });
  };

  const handleSearchFilter = (text: string) => {
    if (text === "") {
      setSearchUsers(users);
    } else {
      const newList = users.filter((user) =>
        user.username.toLowerCase().includes(text.trim().toLowerCase())
      );
      setSearchUsers(newList);
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
            text={"Search users:"}
            onChange={(text) => handleSearchFilter(text)}
          ></SearchFieldComponent>
        </TableFooterSection>
        {searchUsers.length > 0 && (
          <>
            <UsersTable
              users={searchUsers}
              handleDeleteEntity={handleDeleteEntity}
              handleShowUser={undefined}
            ></UsersTable>
          </>
        )}
        <TableFooterSection>
          <ValueButton
            text={"Users count:"}
            value={searchUsers?.length}
          ></ValueButton>
        </TableFooterSection>
      </div>
    </>
  );
};

export default UsersContent;
