import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import "./supportPage.css";
import moment from "moment";
import Cookies from "js-cookie";
import { GET_SUPPORT_TICKET_QUERY ,CREATE_TICKET_NOTES,GET_TICKET_NOTES_BY_ID} from "../../heleper/graphql_helper";

const CLOSE_SUPPORT_TICKET = gql`
  mutation CloseSupportTicket($id: ID!, $status: String!) {
    closeSupportTicketMutation(id: $id, status: $status) {
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
  const SuperAdmin = Cookies.get("SuperAdmin");

  const handleNavigateSupport = () => {
    navigate("/support");
  };
const [ticketNotes,setTicketNotes]=useState([]);
const [note,setNote]=useState("");
const [previewImage, setPreviewImage] = useState("");
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
    tenant_id: "",
  });
  const [closeSupportTicket] = useMutation(CLOSE_SUPPORT_TICKET);

  const { loading: loadingNotes,error: errorNotes, data: notesData} = useQuery(GET_TICKET_NOTES_BY_ID, {
    variables: { ticket_id: id },
  });

  const [createTicketNotes] = useMutation(CREATE_TICKET_NOTES,{refetchQueries: [{ query: GET_TICKET_NOTES_BY_ID,
    variables: { ticket_id: id },
   }],});

  const { loading, error, data } = useQuery(GET_SUPPORT_TICKET_QUERY, {
    variables: { id },
  });

 

  useEffect(() => {
    if (notesData && notesData.getAllTicketNotesByIdQuery) {
      setTicketNotes(notesData.getAllTicketNotesByIdQuery) ;
    }
  }, [notesData]);

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
        image:ticketData.image || ""
      });

    }
  }, [data]);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleInputChange = async (e) => {
    const { type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setPreviewImage(base64);
    } 
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleCloseTicket = (ticketId) => {
    const nextStatus = ticketDetails.status === "close" ? "reopen" : "close";

    closeSupportTicket({
      variables: {
        id: ticketId,
        status: nextStatus, 
      },
    })
      .then((response) => {
        console.log("Ticket status updated successfully:", response.data);
        setTicketDetails((prevDetails) => ({
          ...prevDetails,
          status: nextStatus,
        }));
      })
      .catch((error) => {
        console.error("Error updating ticket status:", error);
      });
  };

  const handleSendMessage =()=>{
    if(note===""&& previewImage===""){
      return false;
    }
    createTicketNotes({
      variables: {
        notes: note,
        added_by: "SuperAdmin", 
        user_id:SuperAdmin,
        ticket_id:id,
        image:previewImage
      },
    })
      .then((response) => {
        console.log("Ticket notes created successfully", response.data);
        setNote('');
        setPreviewImage('');
      })
      .catch((error) => {
        console.error("TicketNote creation failed", error);
      });
  }
  const getDates =(createdAt)=>{
    const date = new Date(Number(createdAt));
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-US', { hour12: false });
    const formattedDate = `${dayOfWeek} ${month} ${day} ${year} - ${time}`;
    return formattedDate;
  }

 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading ticket data</p>;
  if (loadingNotes) return <p>Loading...</p>;
  if (errorNotes) return <p>Error loading ticket data</p>;

  return (
    <div className=" px-4 py-4 mr-4" style={{ marginTop: "70px" }}>
      <div className="card custom-card ">
        <div className="card-body">
          <h5
            className="card-title fw-bold fs-5"
            style={{ fontFamily: "sans-serif" }}
          >
            View Ticket
          </h5>
          <div className="p-4 mt-3">
            <div className="row">
              <div className="col-md-6">
                <div className="row mb-3">
                  <div className="col-md-4">
                    <strong className="fs-6 fw-bold">Type :</strong>
                  </div>
                  <div className="col-md-8 fs-6 ">{ticketDetails.type}</div>
                </div>

                <div className="row mb-3 mt-4">
                  <div className="col-md-4">
                    <strong className="fs-6 fw-bold">Priority :</strong>
                  </div>
                  <div className="col-md-8 fs-6 ">{ticketDetails.priority}</div>
                </div>

                <div className="row mb-3  mt-4">
                  <div className="col-md-4">
                    <strong className="fs-6 fw-bold">Title :</strong>
                  </div>
                  <div className="col-md-8 fs-6 ">{ticketDetails.subject}</div>
                </div>

                <div className="row mb-3   mt-4">
                  <div className="col-md-4">
                    <strong className="fs-6 fw-bold">Description :</strong>
                  </div>
                  <div className="col-md-8 fs-6 ">
                    {ticketDetails.description}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                {/* Created At Row */}
                <div className="row mb-3 align-items-center">
                  <div className="col-md-4">
                    <strong className="fs-6 fw-bold">Created At :</strong>
                  </div>
                  <div className="col-md-8 fs-6">
                    {moment(ticketDetails.createdAt).format("MM/DD/YYYY")}
                  </div>
                </div>

                <div className="row mb-3 mt-4 align-items-center">
                  <div className="col-md-4">
                    <strong className="fs-6 fw-bold">Updated At :</strong>
                  </div>
                  <div className="col-md-8 fs-6">
                    {moment(ticketDetails.updatedAt).format("MM/DD/YYYY")}
                  </div>
                </div>

                <div className="row mb-3 mt-4 align-items-center">
                  <div className="col-md-4">
                    <strong className="fs-6 fw-bold">Status :</strong>
                  </div>
                  <div className="col-md-8 fs-6">
                    {ticketDetails.status || "open"}
                  </div>
                </div>

                <div className="row mb-3 mt-4 align-items-center">
                  <div className="col-md-4">
                    <strong className="fs-6 fw-bold">Image:</strong>
                  </div>
                  <div className="col-md-8">
                  {ticketDetails?.image && (
                      <a 
                        href={ticketDetails.image} 
                        download 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-decoration-underline"
                      >
                       View Image
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex mt-4">
              <button
                className="btn btn-danger me-2"
                onClick={() => handleCloseTicket(ticketDetails.id)}
              >
                {ticketDetails.status === "close"
                  ? "REOPEN TICKET"
                  : "CLOSE TICKET"}
              </button>
              <button
                className="btn  text-white"
                style={{ backgroundColor: "#A1368B" }}
                onClick={handleNavigateSupport}
              >
                BACK
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="card custom-card mt-2">
          <h5
            className="card-title fw-bold fs-5"
            style={{ fontFamily: "sans-serif" }}
           >
            Conversations
          </h5>
        <div className="scrollable-chat-content">
        <div className="chat-discussion">
          {ticketNotes && ticketNotes.length > 0 && ticketNotes.map((ticket, index) =>
              (ticket.added_by === "SuperAdmin" ? 
                  <div className="chat-message right" key={index}>
                      <img className="message-avatar" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt=""/>
                      <div className="message">
                          <span style={{color:"#1675e0"}}>{ticket.user_name} </span>
                          <span className="message-date"> {getDates(ticket.createdAt)} </span>
                          <span className="message-content">
                              {ticket.notes}
                              <div>
                                {ticket?.image && (
                                    <a 
                                      href={ticket.image} 
                                      download 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-decoration-underline"
                                    >
                                    View Image
                                    </a>
                                  )}
                              </div>
                          </span>
                      </div>
                  </div>
              : 
                  <div className="chat-message left" key={index}>
                      <img className="message-avatar" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                      <div className="message">
                          <span style={{color:"#1675e0"}}>{ticket.user_name}</span>
                          <span className="message-date"> {getDates(ticket.createdAt)} </span>
                          <span className="message-content">
                              {ticket.notes}
                              <div>
                                {ticket?.image && (
                                    <a 
                                      href={ticket.image} 
                                      download 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-decoration-underline"
                                    >
                                    View Image
                                    </a>
                                  )}
                              </div>
                          </span>
                      </div>
                  </div>
              )
          )}
        </div>
        </div>
        <div className="card-body">
        {ticketDetails.status === "close" ? (
        <></>
      ) : (
        <div className="p-4 mt-3 row">
          <div className="d-flex w-100 border-0 ">
            <textarea
              className="form-control"
              placeholder="Enter Your Message"
              value={note}
              onChange={handleNoteChange}
              rows="3"
            ></textarea>
          </div>
          <div className="mt-2">
            <div className="d-flex w-100 row ml-1">
            <input class="form-control" type="file"   id="formFile"  onChange={handleInputChange} />
            {previewImage && (
                  <div className="mt-3">
                    <img src={previewImage} alt="Preview" style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }} />
                  </div>
            )}
            </div>
          </div>

          <div className="d-flex mt-4 justify-content-end">
            <button
              className="btn text-white"
              style={{ backgroundColor: "#A1368B" }}
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
        </div>
      </div> */}
    </div>
  );
};

export default SupportViewdetails;
