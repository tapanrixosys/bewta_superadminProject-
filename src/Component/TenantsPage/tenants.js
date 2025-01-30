import React, { useEffect, useState } from "react";
import { Card, useMediaQuery, useTheme, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
const TENANTS = gql`
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

  const navigate = useNavigate();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [fetchTenants, { data, error, loading }] = useLazyQuery(TENANTS);
  const [superAdminData, setSuperAdminData] = useState([]);

  // Add the delete mutation
  const [deleteTenantsMutation] = useMutation(DELETE_TENANT);

  useEffect(() => {
    if (data && data.getAllTentants) {
      setSuperAdminData(data.getAllTentants);
    }
  }, [data, error]);

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleView = (id) => {
    navigate(`/tenant-details/${id}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    // Show confirmation dialog using Swal
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the tenant.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed deletion
        deleteTenantsMutation({
          variables: { id },
          refetchQueries: [{ query: TENANTS }],
        })
          .then(() => {
            Swal.fire(
              "Deleted!",
              "The tenant has been successfully deleted.",
              "success"
            );
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "An error occurred while deleting the tenant.",
              "error"
            );
            console.error("Delete error:", error);
          });
      }
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
      </div>

      <Card className="mt-4" style={{ border: "1px solid #4F5B66", minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <CircularProgress /> // Show Loader while loading
        ) : (
          <table
            className="table table-striped table-bordered"
            style={{ width: "100%", textAlign: "center" }}
          >
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                {/* <th scope="col">Phone</th> */}
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {superAdminData.length > 0 ? (
                superAdminData.map((admin, index) => (
                  <tr key={index}>
                    <td>{admin.firstName}</td>
                    <td>{admin.email}</td>
                    {/* <td>{admin.phoneNumber}</td> */}
                    <td>
                      <VisibilityIcon
                        style={{
                          color: "black",
                          cursor: "pointer",
                          marginRight: "10px",
                        }}
                        onClick={() => handleView(admin._id)}
                      />
                      <DeleteIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleDelete(admin._id)} // Trigger delete mutation
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
