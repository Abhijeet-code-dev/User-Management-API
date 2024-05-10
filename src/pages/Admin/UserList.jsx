import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
//import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import "./userList.css"

const UserList = () => {
    const { data: users, refetch, error } = useGetUsersQuery();
  
    const [deleteUser] = useDeleteUserMutation();
  
    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUserName, setEditableUserName] = useState("");
    const [editableUserEmail, setEditableUserEmail] = useState("");
  
    const [updateUser] = useUpdateUserMutation();
  
    useEffect(() => {
      refetch();
    }, [refetch]);
  
    const deleteHandler = async (id) => {
      if (window.confirm("Are you sure you want to Delete this User?")) {
        try {
          await deleteUser(id);
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };
  
    const toggleEdit = (id, username, email) => {
      setEditableUserId(id);
      setEditableUserName(username);
      setEditableUserEmail(email);
    };
  
    const updateHandler = async (id) => {
      try {
        await updateUser({
          userId: id,
          username: editableUserName,
          email: editableUserEmail,
        });
        setEditableUserId(null);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };

    return(
        <div className="wrapper">
      <h1 className="all-users">Users</h1><br/>
      
        <div>
          {/* <AdminMenu /> */}
          <table className="user-table">
            <thead>
              <tr>
                <th className="heading ">ID</th>
                <th className="heading ">NAME</th>
                <th className="heading ">EMAIL</th>
                <th className="heading ">ADMIN</th>
                <th className="heading"></th>
              </tr>
            </thead>
            <tbody> 
           {users && users.map((user) => (
                <tr key={user._id}>
                  <td className="uid">{user._id}</td>
                  <td className="uid">
                    {editableUserId === user._id ? (
                      <div className="uid">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="text"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="fa-icon"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="text">
                        {user.username}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="fa-icon" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="text">
                    {editableUserId === user._id ? (
                      <div className="text">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="text"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="fa-icon"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.name, user.email)
                          }
                        >
                          <FaEdit className="fa-icon" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="text">
                    {!user.isAdmin && (
                      <div className="text">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="fa-icon"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
     
    </div>
  );
    
};







export default UserList;
  