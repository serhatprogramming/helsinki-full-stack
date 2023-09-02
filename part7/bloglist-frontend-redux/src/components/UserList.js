import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../reducers/usersReducer";

const UserList = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (users) {
    console.log("users:", users);
  }

  return (
    <div>{users ? <p>{users[0].username}</p> : <p>No users yet...</p>}</div>
  );
};

export default UserList;
