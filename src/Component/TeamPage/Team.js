import React, { useEffect, useState } from 'react';
import {
  Card, Button, Dialog, DialogContent, useMediaQuery, useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form, InputGroup } from 'react-bootstrap';
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';

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
      Swal.fire({
        title: 'Success!',
        text: 'Team member created successfully.',
        confirmButtonColor: " #A1368B",
        icon: 'success',
        confirmButtonText: 'OK'
      });
      handleClose();
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error!',
        text: `Team creation failed: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    },
    refetchQueries: [{ query: Teams }],
  });
   

  // Update mutation
  const [updateSuperAdminMutation] = useMutation(UPDATETEAM, {
    onCompleted: () => {
      Swal.fire({
        title: 'Updated!',
        text: 'Team member updated successfully.',
        confirmButtonColor: "#A1368B",
        icon: 'success',
        confirmButtonText: 'OK'
      });
      handleClose();
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error!',
        text: `Update failed: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    },
    refetchQueries: [{ query: Teams }],
  });

  // Delete mutation
  const [deleteSuperAdminMutation] = useMutation(DELETETEAM, {
    onCompleted: () => {
      Swal.fire({
        title: 'Deleted!',
        text: 'Team member deleted successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error!',
        text: `Deletion failed: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    },
    refetchQueries: [{ query: Teams }],
  });

  // Fetch team members
  useEffect(() => {
    if (data && data.getAllTeams) {
      setTeamData(data.getAllTeams);
    }
  }, [data, error]);

  useEffect(() => {
    fetchTeam({
      fetchPolicy: "network-only",
    });
  }, [fetchTeam]);

  // Open the dialog 
  const handleClickOpen = (team = null) => {
    setOpen(true);
    if (team) {
      setEditingTeamId(team._id);  
      setName(team.name);        
      setEmail(team.email);
      setIsAdmin(team.isAdmin);
    } else {
      setEditingTeamId(null);  
      setName('');
      setEmail('');
      setPassword(''); 
      setIsAdmin('Yes');
    }
  };

  const handleClose = () => {
    setOpen(false);
  }; 

  //  create or update team member
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

  //  create team
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

  //delete team member
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
        deleteSuperAdminMutation({
          variables: { id },
        });
      }
    });
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
