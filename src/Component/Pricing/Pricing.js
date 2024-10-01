

import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, Card, Button, Dialog, DialogActions, DialogContent,
  FormControl, Select, Container, TableContainer, TableHead, TableRow,
  TableCell, TextField, MenuItem, useMediaQuery, useTheme, TextareaAutosize
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form, InputGroup, } from 'react-bootstrap';



export default function Pricing() {

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
        <div><h5 style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>All Price</h5></div>
        <div>
          <button type="button" className="btn text-white " style={{ background: " #A1368B" }} onClick={handleClickOpen}  >ADD PRICE</button>
        </div>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          // onClose={handleClose}
          aria-labelledby="responsive-dialog-title"

        >
          <DialogContent>
            <div className='d-flex flex-column justify-content-end'>
              <label for="exampleInputEmail1">Plan Name</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Control
                  type="text"
                  name="planname"

                />
              </InputGroup>

              <label for="exampleInputEmail1">Plan Description</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Control
                  type="text"
                  name="description"

                />
              </InputGroup>

              <label for="exampleInputEmail1">Plan Price </label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Control
                  type="text"
                  name="password"
                />
              </InputGroup>

              <label for="exampleInputEmail1">Currency </label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Select
                  name="Choose Currency"
                >
                  <option value="" >Choose Currency</option>
                  <option value="inr">INR</option>
                  <option value="usdt">USDT</option>

                </Form.Select>
              </InputGroup>

              <label for="exampleInputEmail1">Duration</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Select
                  name="Choose Duration"
                >
                  <option value="" >Choose Duration</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="halfyearly">Half-Yearly</option>
                  <option value="yearly">Yearly</option>
                  <option value="daily">Daily</option>
                </Form.Select>
              </InputGroup>



              <div className='d-flex flex-row mt-4 justify-content-end'>
                <Button className='text-white bg-danger fw-bold' onClick={handleClose}>Cancel</Button>
                <Button

                  style={{ background: "#A1368B", color: "white", marginLeft: "20px", fontWeight: "bold" }}
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
              <th scope="col">Plan Name	</th>
              <th scope="col">Plan Description	</th>
              <th scope="col">Plan Price	</th>
              <th scope="col">Plan Duration</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gold</td>
              <td>all need acess</td>
              <td>350</td>
              <td>monthly</td>
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
