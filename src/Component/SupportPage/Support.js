import * as React from 'react';
import {
  Table, TableBody, Card, Button, Dialog, DialogActions, DialogContent,
  FormControl, Select, Container, TableContainer, TableHead, TableRow,
  TableCell, TextField, MenuItem, useMediaQuery, useTheme, TextareaAutosize
} from '@mui/material';


export default function Support() {
  return (
    <div className="container px-4 py-4">

      <div className="d-flex justify-content-between align-items-center mt-4">
        <div><h5 style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>All SUPPORT</h5></div>
        <div>
          <button type="button" className="btn text-white " style={{  background:" #A1368B" }}>ADD NEW SUPPORT</button>
        </div>

      

      </div>

      <Card className='mt-2' style={{ border: "2px solid #4F5B66 " }}>

        <table class="table"  >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>

            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr><tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>

          </tbody>
        </table>
      </Card>
    </div>

  );
}
