import React, { useState, useEffect } from "react";
import {useQuery,useMutation, gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import "./supportPage.css";
import moment from 'moment';
import { GET_SUPPORT_TICKET_QUERY,  } from "../../heleper/graphql_helper";


const CLOSE_SUPPORT_TICKET = gql`
  mutation CloseSupportTicket($id: ID!,$status:String!) {
    closeSupportTicketMutation(id: $id ,status:$status) {
      id
      status
      subject
      description
    }
  }
`;



const SupportViewdetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const handleNavigateSupport = () => {
    navigate("/support");
  };

  const[isOpen,setIsOpen]=useState(false);
  const [ticketDetails, setTicketDetails] = useState({
    id: "",
    subject: "",
    description: "",
    added_by: "admin",
    status: "",
    priority: "",
    name: "",
    email: "",
    type: "",
    tenant_id: ""

  });
  const [closeSupportTicket] = useMutation(CLOSE_SUPPORT_TICKET);

  const { loading, error, data } = useQuery(GET_SUPPORT_TICKET_QUERY, {
    variables: { id },
  });
  
  useEffect(() => {
    if (data && data.getSupportTicketByIdQuery) {
      const ticketData = data.getSupportTicketByIdQuery;
      setTicketDetails({
        id: ticketData.id || "",
        subject: ticketData.subject || "",
        description: ticketData.description || "",
        status: ticketData.status || "",
        priority: ticketData.priority || "",
        type: ticketData.type || "",
        name: ticketData.name || "",
        email: ticketData.email || "",
        tenant_id: ticketData.tenant_id || "",
      });

      // Set isOpen based on the current status of the ticket
      setIsOpen(ticketData.status !== "close");
    }
  }, [data])

  console.log(ticketDetails, 'ticketdata-------------->>>>>>>>>')


  const handleCloseTicket = (ticketId) => {
    // Decide the next status based on the current status
    const nextStatus = ticketDetails.status === "close" ? "reopen" : "close";

    closeSupportTicket({
      variables: {
        id: ticketId,
        status: nextStatus // Toggle status: close -> reopen -> close
      },
    })
      .then((response) => {
        console.log("Ticket status updated successfully:", response.data);
        // Update the state and ticket status
        setTicketDetails((prevDetails) => ({
          ...prevDetails,
          status: nextStatus
        }));
      })
      .catch((error) => {
        console.error("Error updating ticket status:", error);
      });
  };
  



  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading ticket data</p>;

  return (
     <div className=" px-4 py-4 mr-4" style={{ marginTop: "70px" }}>
      <div className="card custom-card " >
        <div className="card-body">
          <h5 className="card-title fw-bold fs-4" style={{ fontFamily: 'sans-serif' }}>View Ticket</h5>
          <div className="p-4 mt-3">
            <div className="row">
              <div className="col-md-6">
                <div className="row mb-3">
                  <div className="col-md-4">
                    <strong className="fs-5 fw-bold">Type :</strong>
                  </div>
                  <div className="col-md-8 fs-5 ">
                    {ticketDetails.type}

                  </div>
                </div>

                <div className="row mb-3 mt-4">
                  <div className="col-md-4">
                    <strong className="fs-5 fw-bold">Priority :</strong>
                  </div>
                  <div className="col-md-8 fs-5 ">
                    {ticketDetails.priority}
                  </div>
                </div>

                <div className="row mb-3  mt-4">
                  <div className="col-md-4">
                    <strong className="fs-5 fw-bold">Title :</strong>
                  </div>
                  <div className="col-md-8 fs-5 ">
                    {ticketDetails.subject}
                  </div>
                </div>

                <div className="row mb-3   mt-4">
                  <div className="col-md-4">
                    <strong className="fs-5 fw-bold">Description :</strong>
                  </div>
                  <div className="col-md-8 fs-5 ">
                    {ticketDetails.description}
                  </div>
                </div>
              </div>


              <div className="col-md-6">

                {/* Created At Row */}
                <div className="row mb-3 align-items-center">
                  <div className="col-md-4">
                    <strong className="fs-5 fw-bold">Created At :</strong>
                  </div>
                  <div className="col-md-8 fs-5">
                    {moment(ticketDetails.createdAt).format('MM/DD/YYYY')}
                  </div>
                </div>

                <div className="row mb-3 mt-4 align-items-center">
                  <div className="col-md-4">
                    <strong className="fs-5 fw-bold">Updated At :</strong>
                  </div>
                  <div className="col-md-8 fs-5">
                    {moment(ticketDetails.updatedAt).format('MM/DD/YYYY')}
                  </div>
                </div>
                 
                <div className="row mb-3 mt-4 align-items-center">
                  <div className="col-md-4">
                    <strong className="fs-5 fw-bold">Status :</strong>
                  </div>
                  <div className="col-md-8 fs-5">
                  {ticketDetails.status || "open"}
                  </div>
                </div>

              </div>

            </div>

            <div className="d-flex mt-4">
              
            <button className="btn btn-danger fw-bold me-2" onClick={() => handleCloseTicket(ticketDetails.id)}>
                {ticketDetails.status === "close" ? "REOPEN TICKET" : "CLOSE TICKET"}
              </button>
              <button className="btn  fw-bold text-white" style={{ backgroundColor: "#A1368B" }} onClick={handleNavigateSupport}>
                BACK
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default SupportViewdetails;
