import { gql } from "@apollo/client";

 export const GET_SUPPORT_TICKET_QUERY = gql`
  query GetSupportTicketById($id: ID!) {
    getSupportTicketByIdQuery(id: $id) {
      id
      subject
      description
      status
      priority
      image
      type
      tenant_id

    }
  }
`;
export const CREATE_TICKET_NOTES = gql`
  mutation createTicketNotesMutation(
  $notes: String!,
  $user_id: String!, 
  $added_by: String!,       
  $ticket_id: String!,
  $image:String!    
) {
  createTicketNotesMutation(
    notes: $notes,
    user_id: $user_id,
    added_by: $added_by,
    ticket_id:$ticket_id,
    image:$image
  ) {
    _id
    notes
    added_by
    user_id
    ticket_id
    image
   }
}
`;

export const GET_TICKET_NOTES_BY_ID = gql`
query GetSupportTicketById($ticket_id: String!) {
  getAllTicketNotesByIdQuery(ticket_id: $ticket_id) {
    _id
    notes
    added_by
    user_id
    ticket_id
    createdAt
    user_name
    image
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