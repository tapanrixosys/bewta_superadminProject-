import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Form, InputGroup } from "react-bootstrap";
import { gql, useLazyQuery,useMutation } from "@apollo/client";
import toast from "react-hot-toast";


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

const COLLECTION = gql`
  mutation addTenantsMutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
    $roleId: Int!
    $isAdmin: String!
    $locationIds:[Int]!
    $permissionIds:[Int]!
    $serviceIds:[Int]!
  ) {
    addTenantsMutation(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      roleId: $roleId
      isAdmin: $isAdmin
      locationIds:$locationIds
      permissionIds:$permissionIds
      serviceIds:$serviceIds
    ) {
      roleId
      firstName
      lastName
      password
      email
      isAdmin
      phoneNumber
      locationIds
      permissionIds
      serviceIds
    }
  }`

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
  

  const [addTenantsMutation] = useMutation(COLLECTION, {
    onCompleted: (data) => {
      toast.success("Tenant added Successfullly", { position: "top-right" });
      handleClose();
      fetchTenants(); // Refetch the tenants after adding a new one
    },
    onError: (error) => {
      toast.error(`Login failed: ${error.message}`, { position: "top-right" });
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

  const handleCreate = () => {
    addTenantsMutation({
      variables: {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        roleId,
        isAdmin,
        locationIds,
        permissionIds,
        serviceIds,
      },
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
        <div>
          <button
            type="button"
            className="btn text-white "
            style={{ background: " #A1368B" }}
            onClick={handleClickOpen}
          >
            ADD TENANTS
          </button>
        </div>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          // onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <div className="d-flex flex-column justify-content-end">
              <label for="exampleInputEmail1"> First Name</label>
              <InputGroup
                className="mb-3"
                style={{ width: 500, maxWidth: "100%" }}
                size="lg"
              >
                <Form.Control type="text" name="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </InputGroup>

              <label for="exampleInputEmail1">Last Name</label>
              <InputGroup
                className="mb-3"
                style={{ width: 500, maxWidth: "100%" }}
                size="lg"
              >
                <Form.Control type="text" name="lastname"  value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </InputGroup>

              <label for="exampleInputEmail1">Email</label>
              <InputGroup
                className="mb-3"
                style={{ width: 500, maxWidth: "100%" }}
                size="lg"
              >
                <Form.Control type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </InputGroup>

              <label for="exampleInputEmail1">Password</label>
              <InputGroup
                className="mb-3"
                style={{ width: 500, maxWidth: "100%" }}
                size="lg"
              >
                <Form.Control type="text" name="password"  value={password} onChange={(e) => setPassword(e.target.value)} />
              </InputGroup>

              <label for="exampleInputEmail1">Phone</label>
              <InputGroup
                className="mb-3"
                style={{ width: 500, maxWidth: "100%" }}
                size="lg"
              >
                <Form.Control type="text" name="password" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  />
              </InputGroup>

              <div className="d-flex flex-row mt-4 justify-content-end">
                <Button
                  className="text-white bg-danger fw-bold"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  style={{
                    background: "#A1368B",
                    color: "white",
                    marginLeft: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={handleCreate}
                >
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {superAdminData.length > 0 ? (
              superAdminData.map((admin, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{admin.firstName}</td>
                  <td>{admin.lastName}</td>
                  <td>{admin.email}</td>
                  <td>{admin.phoneNumber}</td>
                  <td> 
                    <EditIcon
                      style={{
                        color: "black",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    />
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
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
    </div>
  );
}
