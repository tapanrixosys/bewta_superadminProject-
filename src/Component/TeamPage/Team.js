

import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, Card, Button, Dialog, DialogActions, DialogContent,
  FormControl, Select, Container, TableContainer, TableHead, TableRow,
  TableCell, TextField, MenuItem, useMediaQuery, useTheme, TextareaAutosize
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form, InputGroup, } from 'react-bootstrap';



export default function TenantsPage () {

  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
     
  };
 
  return (
    <div className="container px-4 py-4">

      <div className="d-flex justify-content-between align-items-center mt-4">
        <div><h5 style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>All TEAM MEMBERS</h5></div>
        <div>
          <button type="button" className="btn text-white " style={{  background:" #A1368B" }}   onClick={handleClickOpen}  >ADD TEAM</button>
        </div>

        <Dialog
                            fullScreen={fullScreen} 
                            open={open}
                            // onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"

                        >
                            <DialogContent>
                                <div className='d-flex flex-column justify-content-end'>
                                    <label for="exampleInputEmail1">Name</label>
                                    <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                                        <Form.Control
                                            type="text"
                                            name="name"

                                        />
                                    </InputGroup>

                                    <label for="exampleInputEmail1">Email Id:</label>
                                    <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                                        <Form.Control
                                            type="text"
                                            name="email"
                                           
                                        />
                                    </InputGroup>

                                    <label for="exampleInputEmail1">Password</label>
                                    <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                                        <Form.Control
                                            type="text"
                                            name="password"
                                        />
                                    </InputGroup>



                                    <div className='d-flex flex-row mt-4 justify-content-end'>
                                        <Button className='text-white bg-danger fw-bold' onClick={handleClose}>Cancel</Button>
                                        <Button
                                           
                                            style={{ background: "#A1368B", color: "white", marginLeft: "20px",fontWeight:"bold" }}
                                        >Create</Button>
                                 
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
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>kanha</td>
            <td>khatua@gmail.com</td>
            <td>8327723287</td>
            <td>
              <EditIcon style={{ color: "black", cursor: "pointer", marginRight: "10px" }} />
              <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Manas</td>
            <td>roxosys@gmail.com</td>
            <td>8327723287</td>
            <td>
            <EditIcon style={{ color: "black", cursor: "pointer", marginRight: "10px" }} />
            <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Manas</td>
            <td>roxosys@gmail.com</td>
            <td>8327723287</td>
            <td>
            <EditIcon style={{ color: "black", cursor: "pointer", marginRight: "10px" }} />
            <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
            </td>
          </tr>
        </tbody>  
      </table>
    </Card>

    </div>

  );
}
