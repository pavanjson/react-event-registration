import { useEffect } from "react";
import { useUser } from "../context/userContext";
import axios from "axios";
import OrganizerHome from "./OrganizerHome";

const AdminDashboard = () => {
  const { userData, setUser } = useUser();

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_GET_USER_INFO_URL}`;
    if (authToken) {
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  }, [userData, setUser]);

  return (
    <div>
      <h1 className="m-3">Admin Dashboard</h1>
      <OrganizerHome />
    </div>
  );
};

export default AdminDashboard;
