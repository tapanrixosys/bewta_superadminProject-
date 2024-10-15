import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./supportPage.css";
import Dialog from "@mui/material/Dialog";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { ListGroup } from "react-bootstrap";
import { GET_SUPPORT_TICKET_QUERY, Teams } from "../../heleper/graphql_helper";
import toast, { Toaster } from "react-hot-toast";


const SupportViewdetails = () => {

  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [team, setTeam] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const handleSelectTenant = (tenant) => {
    setSelectedTenant(tenant);
    console.log(selectedTenant)
  };
  const [fetchTeams, { data: teamData, error: teamError }] = useLazyQuery(Teams);

  // Fetch team data when component mounts
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  // Update team state when teamData is available
  useEffect(() => {
    if (teamData && teamData.getAllTeams) {
      setTeam(teamData.getAllTeams);
      console.log("Fetched teams data:", teamData.getAllTeams);
    } else if (teamError) {
      console.error("Error fetching team data:", teamError);
      toast.error("Failed to fetch team data.");
    }
  }, [teamData, teamError]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [ticketDetails, setTicketDetails] = useState({
    subject: "",
    description: "",
    status: "",
    priority: "",
    name: "",
    email: "",
  });

  // Fetch the support ticket details using the ID from params
  const { loading, error, data: ticketData } = useQuery(GET_SUPPORT_TICKET_QUERY, {
    variables: { id },
  });

  // Update ticket details when ticketData is available
  useEffect(() => {
    if (ticketData && ticketData.getSupportTicketByIdQuery) {
      const { subject, description, status, priority, name, email } = ticketData.getSupportTicketByIdQuery;
      setTicketDetails({
        subject: subject || "",
        description: description || "",
        status: status || "",
        priority: priority || "",
        name: name || "",
        email: email || "",
      });
    }
  }, [ticketData]);

  // Filter the team based on search term
  const filteredTenants = team.filter((teams) =>
    teams.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-2 py-2 mr-4" style={{ marginTop: "70px" }}>
      <div className="mb-4 d-flex justify-content-center mt-4">
        <div>
          <label className="custom-font-600 font-size-20 font-sans ml-4">
            Contact Us
          </label>
          <div className="viewcard card radius-16px no-shadow mb-4 p-4 mt-2">
            <form>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="custom-text-black font-size-14 custom-font-700 mt-0 mb-0 font-sans">
                    Full name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="new-textinput text-gray p-2 w-100"
                    type="text"
                    name="fullName"
                    value={ticketDetails.name}
                    readOnly
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="custom-text-black font-size-14 custom-font-700 mt-0 mb-0 font-sans">
                    Email ID <span className="text-danger">*</span>
                  </label>
                  <input
                    className="new-textinput text-gray p-2  w-100"
                    type="email"
                    name="email"
                    value={ticketDetails.email}
                    readOnly
                  />
                </div>
              </div>

              <div className="row g-3 mt-3">
                <div className="col-12">
                  <label className="custom-text-black font-size-14 custom-font-700 mt-0 mb-0 font-sans">
                    Subject <span className="text-danger">*</span>
                  </label>
                  <input
                    className="new-textinput text-gray p-2  w-100"
                    type="text"
                    name="subject"
                    value={ticketDetails.subject}
                    readOnly
                  />
                </div>
              </div>

              <div className="row g-3 mt-3">
                <div className="col-12">
                  <label className="font-size-14 custom-font-700 mt-0 mb-0 font-sans">
                    Describe problem <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control w-100 p-3 text-gray describeproblem"
                    name="description"
                    value={ticketDetails.description}
                    readOnly
                  ></textarea>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-4">
                <button
                  type="button"
                  onClick={handleClickOpen}
                  className="font-size-16 custom-font-700 font-sans text-white text-capitalize"
                  style={{
                    width: "360px",
                    height: "60px",
                    backgroundColor: "#A1368B",
                    borderRadius: "10px",
                    border: "none",
                  }}
                >
                  Assign Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{ width: "800px", left: "30%" }}
      >
        <div style={{ padding: "10px" }}>
          <div className="d-flex justify-content-between align-items-center ">
            <h6 className="custom-font-700   font-sans-20">Assign Agent</h6>
            <h3
              className="custom-font-700 font-size-12 font-sans"
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            >
              Close
            </h3>
          </div>

          <div
            className="search-btn d-flex flex-row jusify-content-center align-items-center mt-4 "
            style={{ border: "2px solid  #A1368B", borderRadius: "5px" }}
          >
            <input
              className="border-0 mt-0 p-0 custom-font-500 "
              style={{ outline: "none" }}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <label className="mt-4 custom-font-700 font-size-16 text-gray font-sans">
            Select People
          </label>

          <div style={{ height: "150px", overflowY: "auto" }}>
      {filteredTenants.map((admin, index) => (
        <ListGroup.Item
          className={`d-flex align-items-center no-border mt-3 pointer border-15 ${
            selectedTenant === admin ? 'selected-tenant' : ''
          }`}
          key={index}
          onClick={() => handleSelectTenant(admin)} // Handle selection
          style={{
            backgroundColor: selectedTenant === admin ? '#A1368B' : 'transparent',
            color: selectedTenant === admin ? 'white' : 'black',
            cursor: 'pointer',
          }}
        >
          <div
            className="rounded-circle text-white"
            style={{
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",
              backgroundColor: selectedTenant === admin ? '#A1368B' : '#A1368B',
              color: selectedTenant === admin ? '#A1368B' : 'white',
            }}
          >
            {admin.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-gray custom-font-500 font-size-16" style={{ cursor: 'pointer' }}>
            {admin.name || 'No Name'}
          </div>
        </ListGroup.Item>
      ))}
    </div>

          <div className="d-flex  justify-content-center mt-4 mb-2">
            <button
              className="mt-4 w-100 p-3 custom-font-500 font-size-16 rounded-2 border-0 text-white"
              style={{ background: "#A1368B" }}
            >
              Assign
            </button>
          </div>

        </div>

      </Dialog>

      <Toaster />
    </div>
  );
};

export default SupportViewdetails;
