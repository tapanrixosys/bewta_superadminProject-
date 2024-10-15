import { gql } from "@apollo/client";

export const GET_ALLSUPPORT = gql`
  query GetAllSupport {
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


 export const GET_SUPPORT_TICKET_QUERY = gql`
  query GetSupportTicketById($id: ID!) {
    getSupportTicketByIdQuery(id: $id) {
      id
      subject
      description
      status
      priority
      name
      email
    }
  }
`;

 export const Teams = gql`
  query {
    getAllTeams {
      _id
      email
      isAdmin
      name
    }
  }
`;