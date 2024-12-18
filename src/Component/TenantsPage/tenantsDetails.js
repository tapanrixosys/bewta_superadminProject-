import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
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

  }
}
`


const TenantDetails = () =>{

    const {id} = useParams();

    const [tenantDetails,setTenantDetails] = useState('')

    const { loading, error, data } = useQuery(GET_TENANT_BY_ID, {
        variables: { id: id }, 
        fetchPolicy: "network-only",
      });


      useEffect(()=>{
        if(data && data.getTenant){
            setTenantDetails(data.getTenant)
        }
        console.log(data,"data------>")
      },[data])



    return(
       <div className="m-4">
        <div>
            <h6>Tenant Details:</h6>
            <div>
                First Name: {tenantDetails?.firstName}<br/>
                Last Name: {tenantDetails?.lastName}<br/>
                Email Id: {tenantDetails?.email}<br/>
                Admin:  {tenantDetails?.isAdmin}<br/>
                Contact Number: {tenantDetails?.phoneNumber}
            </div> 
        </div>
       </div>
    )
    }
    
    export default TenantDetails;
