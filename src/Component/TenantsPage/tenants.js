import React, { useEffect, useState } from "react";
import {Card} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from 'react-router-dom'
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

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
  const navigate = useNavigate();

  const [fetchTenants, { data, error }] = useLazyQuery(Tenants);
  const [superAdminData, setSuperAdminData] = useState([]); 

  // Add the delete mutation
  const [deleteTenantsMutation] = useMutation(DELETE_TENANT, {
    onCompleted: (data) => {
      Swal.fire({
        title: 'Success!',
        text: 'Tenant Deleted successfully.',
        confirmButtonColor: " #A1368B",
        icon: 'success',
        confirmButtonText: 'OK'
      });
      handleClose();
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error!',
        text: `Tenant deletion failed: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    },
    refetchQueries: [{ query: Tenants }],
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

  const handleView = (id)=>{
    navigate(`/tenant-details/${id}`)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTenantsMutation({
          variables: { id },
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

      <Card className="mt-4" style={{ border: "2px solid #4F5B66 " }}>
        <table
          className="table table-striped table-bordered"
          style={{ width: "100%", textAlign: "center" }}
        >
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {superAdminData.length > 0 ? (
              superAdminData.map((admin, index) => (
                <tr key={index}>
                  <td>{admin.firstName}</td>
                  <td>{admin.email}</td>
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
      </Card>
      <Toaster />
    </div>
  );
}
