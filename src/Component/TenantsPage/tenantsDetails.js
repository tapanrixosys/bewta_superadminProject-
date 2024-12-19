import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "reactstrap";

const GET_TENANT_BY_ID = gql` 
query getTenantById ($id:ID!) {
  getTenant(_id:$id){
   employeeId 
    roleId
    locationId
    permissionIds
    serviceIds
    locationIds
    firstName
    isAdmin
    adminId
    lastName
    email
    phoneNumber
    profilePicture
    permanentPasswordSet
    password
    tokenCount
    status
    company
    domain
  }
}
`


const TenantDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [tenantDetails, setTenantDetails] = useState('')

  const handleNavigateSupport = () => {
    navigate("/tenants");
  };
  const { loading, error, data } = useQuery(GET_TENANT_BY_ID, {
    variables: { id: id },
    fetchPolicy: "network-only",
  });


  useEffect(() => {
    if (data && data.getTenant) {
      setTenantDetails(data.getTenant)
    }
    console.log(data, "data------>")
  }, [data])



  return (
    <div className="m-4">
      <div>

        <div className="card custom-card ">
          <div className="card-body">
          <h5
            className="card-title fw-bold fs-4 mb-4"
            style={{ fontFamily: "sans-serif" }}
          >
            Tenants Details
          </h5>
            <div className="p-4 mt-3">
              <div className="row">
                <div className="col-md-6">
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <strong className="fs-6 fw-bold">FirstName :</strong>
                    </div>
                    <div className="col-md-8 fs-6 ">{tenantDetails?.firstName}</div>
                  </div>

                  {/* <div className="row mb-3 mt-4">
                              <div className="col-md-4">
                                <strong className="fs-6 fw-bold">LastName :</strong>
                              </div>
                              <div className="col-md-8 fs-6 ">{tenantDetails?.lastName}</div>
                            </div> */}

                  <div className="row mb-3  mt-4">
                    <div className="col-md-4">
                      <strong className="fs-6 fw-bold">Email :</strong>
                    </div>
                    <div className="col-md-8 fs-6 ">{tenantDetails?.email}</div>
                  </div>

                  <div className="row mb-3   mt-4">
                    <div className="col-md-4">
                      <strong className="fs-6 fw-bold">Admin :</strong>
                    </div>
                    <div className="col-md-8 fs-6 ">
                      {tenantDetails?.isAdmin}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="row mb-3 align-items-center">
                    <div className="col-md-4">
                      <strong className="fs-6 fw-bold">Company :</strong>
                    </div>
                    <div className="col-md-8 fs-6">
                      {tenantDetails?.company}
                    </div>
                  </div>

                  <div className="row mb-3 mt-4 align-items-center">
                    <div className="col-md-4">
                      <strong className="fs-6 fw-bold">Domain:</strong>
                    </div>
                    <div className="col-md-8 fs-6">
                      {tenantDetails?.domain}
                    </div>
                  </div>

                  {/* <div className="row mb-3 mt-4 align-items-center">
                              <div className="col-md-4">
                                <strong className="fs-6 fw-bold">Status :</strong>
                              </div>
                              <div className="col-md-8 fs-6">
                                {ticketDetails.status || "open"}
                              </div>
                            </div> */}

                  {/* <div className="row mb-3 mt-4 align-items-center">
                              <div className="col-md-4">
                                <strong className="fs-6 fw-bold">Image:</strong>
                              </div>
                              <div className="col-md-8 fs-6">
                                {ticketDetails.status || "open"}
                              </div>

                            </div> */}
                </div>
              </div>

              <div className="d-flex mt-4 justify-content-end">

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
      </div>
    </div>
  )
}

export default TenantDetails;
