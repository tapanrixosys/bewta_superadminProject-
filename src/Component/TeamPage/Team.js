import React, { useEffect, useState } from 'react';
import {
  Card, Button, Dialog, DialogContent, useMediaQuery, useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form, InputGroup } from 'react-bootstrap';
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";

// GraphQL Queries and Mutations
const Teams = gql`
  query {
    getAllTeams {
      _id
      email
      isAdmin
      name
    }
  }
`;

const CREATETEAM = gql` 
  mutation createSuperAdmin($name: String!, $password: String!, $email: String!, $isAdmin: String!) {
    createSuperAdmin(name: $name, password: $password, email: $email, isAdmin: $isAdmin) {
      name
      password
      email
      isAdmin   
    }          
  }    
`;

const UPDATETEAM = gql`
  mutation updateSuperAdminMutation($id: String!, $name: String, $email: String, $password: String, $isAdmin: String) {
    updateSuperAdminMutation(id: $id, name: $name, email: $email, password: $password, isAdmin: $isAdmin) {
      _id
      name
      email
      isAdmin
    }
  }
`;

const DELETETEAM = gql`
  mutation deleteSuperAdminMutation($id: String!) {
    deleteSuperAdminMutation(id: $id) {
      _id
      name
    }
  }   
`;

export default function TenantsPage() {
  const [open, setOpen] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("Yes");
  const [editingTeamId, setEditingTeamId] = useState(null); // Added for update

  const theme = useTheme(); 
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Fetch teams query
  const [fetchTeam, { data, error }] = useLazyQuery(Teams);

  // Create mutation
  const [createSuperAdmin] = useMutation(CREATETEAM, {
    onCompleted: () => {
      toast.success("Team added successfully", { position: "top-right" });
      handleClose();
      fetchTeam(); // Refetch the teams after adding a new one
    },
    onError: (error) => {
      toast.error(`Team creation failed: ${error.message}`, { position: "top-right" });
    },
  });

  // Update mutation
  const [updateSuperAdminMutation] = useMutation(UPDATETEAM, {
    onCompleted: () => {
      toast.success("Team member updated successfully", { position: "top-right" });
      handleClose();
      fetchTeam(); // Refetch the teams after updating
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`, { position: "top-right" });
    },
  });

  // Delete mutation
  const [deleteSuperAdminMutation] = useMutation(DELETETEAM, {
    onCompleted: () => {
      toast.success("Team member deleted successfully", { position: "top-right" });
      fetchTeam(); // Refetch the teams after deletion
    },
    onError: (error) => {
      toast.error(`Deletion failed: ${error.message}`, { position: "top-right" });
    },
  });

  // Fetch team members
  useEffect(() => {
    if (data && data.getAllTeams) {
      setTeamData(data.getAllTeams);
    }
  }, [data, error]);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  // Open the dialog for adding or editing team members
  const handleClickOpen = (team = null) => {
    setOpen(true);
    if (team) {
      setEditingTeamId(team._id);  // Set the editing ID
      setName(team.name);          // Pre-fill the name, email, etc.
      setEmail(team.email);
      setIsAdmin(team.isAdmin);
    } else {
      setEditingTeamId(null);  // Set to null for adding a new team member
      setName('');
      setEmail('');
      setPassword(''); // Reset the password
      setIsAdmin('Yes');
    }
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  }; 

  // Handle create or update team member
  const handleSubmit = () => {
    if (editingTeamId) {
      updateSuperAdminMutation({
        variables: {
          id: editingTeamId,
          name,
          email,
          password,
          isAdmin,
        },
      });
    } else {
      handleCreate();
    }
  };

  // Handle create team
  const handleCreate = () => {
    createSuperAdmin({
      variables: {
        name,
        email,
        password,
        isAdmin,
      },
    });
  };

  // Handle delete team member
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      deleteSuperAdminMutation({
        variables: { id },
      });
    }
  };

  return (
    <div className="container px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>
          <h5 style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>All TEAM MEMBERS</h5>
        </div>
        <div>
          <button type="button" className="btn text-white" style={{ background: " #A1368B" }} onClick={() => handleClickOpen()}>ADD TEAM</button>
        </div>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <div className='d-flex flex-column justify-content-end'>
              <label htmlFor="exampleInputEmail1">Name</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>

              <label htmlFor="exampleInputEmail1">Email Id:</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Control
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>

              <label htmlFor="exampleInputEmail1">Password</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Control
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>

              <div className='d-flex flex-row mt-4 justify-content-end'>
                <Button className='text-white bg-danger fw-bold' onClick={handleClose}>Cancel</Button>
                <Button
                  style={{ background: "#A1368B", color: "white", marginLeft: "20px", fontWeight: "bold" }}
                  onClick={handleSubmit}
                >
                  {editingTeamId ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className='mt-4' style={{ border: "2px solid #4F5B66 " }}>  
        <table className="table table-striped table-bordered" style={{ width: '100%', textAlign: 'center' }}>
          <thead className="thead-light">     
            <tr>
              <th scope="col">ID</th>
              <th scope="col"> Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {teamData.length > 0 ? (
              teamData.map((team, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{team.name}</td>
                  <td>{team.email}</td> 
                  <td>                   
                    <EditIcon style={{ color: "black", cursor: "pointer", marginRight: "10px" }} onClick={() => handleClickOpen(team)} />
                    <DeleteIcon style={{ color: "black", cursor: "pointer" }} onClick={() => handleDelete(team._id)} />
                  </td>
                </tr>  
              ))        
            ) : (
              <tr>  
                <td   colSpan={4}>No teams found</td>
              </tr>
            )}         
          </tbody>
        </table>
      </Card>
      <Toaster />
    </div>
  );
}
