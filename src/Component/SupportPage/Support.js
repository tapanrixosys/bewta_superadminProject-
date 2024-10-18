import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from 'react-spinners';  // Assuming you have installed react-spinners
import Switch from '@mui/material/Switch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { gql, useLazyQuery } from "@apollo/client";  


const SupportTickets  = gql`
  query {
    getAllSupportTickets {
      id
      subject
      description
      added_by
      status
      priority
      name
      email
      
    }
  }
`;

export default function SupportPage() {

  const navigate = useNavigate();
  const [getAllSupportTickets, { data, error }] = useLazyQuery(SupportTickets); 
  const [supportData, setSupportData] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // Handle support tickets data when it's available
  // useEffect(() => {
  //   if (data) {
  //     setSupportTickets(data.getAllSupportTickets || []);
  //   } 
  // }, [data]); 

  // if (loading) {
  //   return (
  //     <div className="d-flex justify-content-center" style={{ height: '100vh', marginTop: "100px" }}>
  //       <PropagateLoader color="#4F5B66" />
  //     </div>
  //   );
  // }


  useEffect(() => {
    if (data && data.getAllSupportTickets) {
      setSupportData(data.getAllSupportTickets);
      console.log(data,"supportData-")
    }
  }, [data, error]);

  useEffect(() => {
    getAllSupportTickets();
  }, [getAllSupportTickets]);
  

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h5 style={{ fontWeight: "bold", fontFamily: "sans-serif" }}> Support Request</h5>

        <div>
          <p className='mt-0 mb-0 fw-bold font-size-16 font-sans custom-font-600 font-sans'>
            Auto Assign:
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </p>
        </div>
      </div>

      <Card className='mt-4' style={{ border: "2px solid #4F5B66" }}>
        <table className="table table-striped table-bordered" style={{ width: '100%', textAlign: 'center' }}>
          <thead className="thead-light">
            <tr>
              {/* <th scope="col">REQ ID</th> */}
              <th scope="col">SHORT DESCRIPTION</th>
              <th scope="col">OPEN DATE</th>
              <th scope="col">LAST UPDATED DATE</th>
              <th scope="col">STATUS</th>
              <th scope="col">ASSIGN</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {supportData.length > 0 && (
              supportData.map((ticket, index) => (
                <tr key={ticket.id}>
                  {/* <td>{index + 48454555}</td> */}
                  <td>{ticket.description}</td>
                  <td>{moment(ticket.createdAt).format('MM/DD/YYYY')}</td>
                  <td>{moment(ticket.updatedAt).format('MM/DD/YYYY')}</td>
                  <td>{ticket.status}</td> 
                  <td>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div>-Not assigned</div>
                      <div>
                        <span className='arrow pointer'><ExpandMoreIcon /></span>
                      </div>
                    </div>
                  </td>
                  <td onClick={() => navigate(`/support-viewdetails/${ticket.id}`)} style={{ cursor: 'pointer' }}>
                    View Details
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
