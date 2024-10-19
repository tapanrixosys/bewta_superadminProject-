import React, { useEffect, useState } from "react";
import {
  Card,
  useMediaQuery,
  useTheme, 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";

const Tenants  = gql`
  query {
    getAllTentants { 
      _id
      firstName
      lastName
      email
      phoneNumber 
      roleId       
      isAdmin          
      locationIds    
      permissionIds  
      serviceIds
    }
  }
`;

const DELETE_TENANT = gql`
  mutation deleteTenantsMutation($id: ID!) {
    deleteTenantsMutation(id: $id) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export default function TenantsPage() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roleId, setRoleId] = useState(1);
  const [isAdmin, setIsAdmin] = useState("yes");
  const [locationIds, setLocationIds] = useState([1]);
  const [permissionIds, setPermissionIds] = useState([1]);
  const [serviceIds, setServiceIds] = useState([1]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  

  const [fetchTenants, { data, error }] = useLazyQuery(Tenants);
  const [superAdminData, setSuperAdminData] = useState([]); 

  // Add the delete mutation
  const [deleteTenantsMutation] = useMutation(DELETE_TENANT, {
    onCompleted: (data) => {
      toast.success("Tenant deleted successfully", { position: "top-right" });
      fetchTenants(); // Refetch tenants after deletion
    },
    onError: (error) => {
      toast.error(`Tenant deletion failed: ${error.message}`, { position: "top-right" });
    },
  });

  useEffect(() => {
    if (data && data.getAllTentants) {
      setSuperAdminData(data.getAllTentants);
    }
  }, [data, error]);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  const handleClickOpen = () => {
    setOpen(true);
  }; 

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    // Call the delete mutation
    deleteTenantsMutation({
      variables: { id },
    });
  };

  return (
    <div className="container px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>
          <h5 style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>
            All TENANTS
          </h5>
        </div>
        {/* <div>
          <button
            type="button"
            className="btn text-white "
            style={{ background: " #A1368B" }}
            onClick={handleClickOpen}
          >
            ADD TENANTS
          </button> 
        </div> */}
        {/* Dialog for adding tenants remains the same */}
      </div>

      <Card className="mt-4" style={{ border: "2px solid #4F5B66 " }}>
        <table
          className="table table-striped table-bordered"
          style={{ width: "100%", textAlign: "center" }}
        >
          <thead className="thead-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              {/* <th scope="col">Last Name</th> */}
              <th scope="col">Email</th>
              {/* <th scope="col">Phone</th> */}
              {/* <th scope="col">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {superAdminData.length > 0 ? (
              superAdminData.map((admin, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{admin.firstName}</td>
                  {/* <td>{admin.lastName}</td> */}
                  <td>{admin.email}</td>
                  {/* <td>{admin.phoneNumber}</td> */}
                  {/* <td> 
                    <EditIcon
                      style={{
                        color: "black",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    />
                    <DeleteIcon
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDelete(admin._id)} // Trigger delete mutation
                    />
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
      <Toaster />
    </div>
  );
}
