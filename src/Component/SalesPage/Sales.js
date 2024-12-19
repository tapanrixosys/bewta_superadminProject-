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




export default function SalesPage() {
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

  
   


  

  // Fetch team members
 

  

 
  //  create team
 

 
  return (
    <div className="container px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>
          <h5 style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>All SALES </h5>
        </div>
        <div>
          <button type="button" className="btn text-white" style={{ background: " #A1368B" }} >ADD SALES</button>
        </div>

     
      </div>

      <Card className='mt-4' style={{ border: "2px solid #4F5B66 " }}>  
        <table className="table table-striped table-bordered" style={{ width: '100%', textAlign: 'center' }}>
          <thead className="thead-light">     
            <tr>
              <th scope="col"> Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead> 

          <tbody>
            
             
                <tr >
                  <td>bhabesh</td>
                  <td>bhabesh09@gmail.com</td> 
                  <td>                   
                    <EditIcon style={{ color: "black", cursor: "pointer", marginRight: "10px" }}  />
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
                  </td>
                </tr>  
                <tr >
                  <td>manas</td>
                  <td>manas09@gmail.com</td> 
                  <td>                   
                    <EditIcon style={{ color: "black", cursor: "pointer", marginRight: "10px" }}  />
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
                  </td>
                </tr>  <tr >
                  <td>biju</td>
                  <td>biju@gmail.com</td> 
                  <td>                   
                    <EditIcon style={{ color: "black", cursor: "pointer", marginRight: "10px" }}  />
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
                  </td>
                </tr>  
                      
          </tbody>
        </table>
      </Card>
      <Toaster />
    </div>
  );
}
