import React, { useEffect, useState } from 'react';
import { Card ,CircularProgress} from '@mui/material';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
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
      type
      image
      tenant_id
      
    }
  }
`;

export default function SupportPage() {
 
  const navigate = useNavigate();
  const [getAllSupportTickets, { data, error,loading }] = useLazyQuery(SupportTickets); 
  const [supportData, setSupportData] = useState([]);

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

       
      </div>

      <Card className='mt-4' style={{ border: "1px solid #4F5B66", minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
                          <CircularProgress /> // Show Loader while loading
                        ) : (
        <table className="table table-striped table-bordered" style={{ width: '100%', textAlign: 'center' }}>
          <thead className="thead-light">
            <tr>
              <th scope="col">SHORT DESCRIPTION</th>
              <th scope="col">OPEN DATE</th>
              <th scope="col">LAST UPDATED DATE</th>
              <th scope="col">STATUS</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {supportData.length > 0 && (
              supportData.map((ticket, index) => (
                <tr key={ticket.id}>
                  <td className='text-left'>{ticket.description}</td>
                  <td>{moment(ticket.createdAt).format('MM/DD/YYYY')}</td>
                  <td>{moment(ticket.updatedAt).format('MM/DD/YYYY')}</td>
                  <td>{ticket.status}</td> 
                  <td onClick={() => navigate(`/support-viewdetails/${ticket.id}`)} style={{ cursor: 'pointer' }}>
                    View Details
                  </td>
                </tr> 
              ))
            )}
          </tbody>
        </table>
   )}
      </Card>
    </div>
  );
}
