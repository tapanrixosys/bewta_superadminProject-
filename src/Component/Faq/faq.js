import React, { useEffect, useState } from 'react';
import {
  Card, Button, Dialog, DialogContent, useMediaQuery, useTheme
} from '@mui/material';
import { Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";  
// import { PropagateLoader } from 'react-spinners';  
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';


// Queries and Mutations
const GET_ALL_FAQS = gql`
  query {
    getAllFaqsQuery {
      id
      question
      answer
    }
  }
`;

const DELETE_FAQ = gql`
  mutation deletedFaqMutation($id: ID!) {
    deletedFaqMutation(id: $id) {
      id
      question
      answer
    }
  }
`;

const ADD_FAQ = gql`
  mutation addFaqMutation($question: String!, $answer: String!) {
    addFaqMutation(question: $question, answer: $answer) {
      id
      question
      answer
    }
  }
`;

const UPDATE_FAQ = gql`
  mutation updateFaqMutation($id: ID!, $question: String!, $answer: String!) {
    updateFaqMutation(id: $id, question: $question, answer: $answer) {
      id
      question
      answer
    }
  }
`;

export default function FaqPage() { 

  const navigate = useNavigate();  
  const [getAllFaqs, { data, error, loading }] = useLazyQuery(GET_ALL_FAQS); 
  const [deleteFaq] = useMutation(DELETE_FAQ);
  const [addFaq] = useMutation(ADD_FAQ);
  const [updateFaq] = useMutation(UPDATE_FAQ); // Mutation for updating FAQ

  const [faqData, setFaqData] = useState([]);
  const [open, setOpen]  = useState(false); 
  const [editMode, setEditMode] = useState(false); // Tracks if we are editing
  const [editFaq, setEditFaq] = useState(null); // Holds the FAQ being edited

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const theme = useTheme(); 
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setEditFaq(null);
    setNewQuestion("");
    setNewAnswer("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEditOpen = (faq) => {
    setEditFaq(faq);
    setNewQuestion(faq.question);
    setNewAnswer(faq.answer);
    setEditMode(true);
    setOpen(true);
  }; 



  useEffect(() => {
    getAllFaqs();
  }, [getAllFaqs]);

  useEffect(() => {
    if (data && data.getAllFaqsQuery) {
      setFaqData(data.getAllFaqsQuery);
    } 
  }, [data]);

  const handleCreateFaq = () => {
    addFaq({
      variables: { question: newQuestion, answer: newAnswer },
      update: (cache, { data: { addFaqMutation } }) => {
        const existingFaqs = cache.readQuery({ query: GET_ALL_FAQS });
        cache.writeQuery({
          query: GET_ALL_FAQS,
          data: { getAllFaqsQuery: [...existingFaqs.getAllFaqsQuery, addFaqMutation] },
        });
      }
    }).then(() => {
      handleClose();
    }).catch((err) => {
      console.error("Error adding FAQ: ", err);
    });
  };

  const handleUpdateFaq = () => {
    updateFaq({
      variables: { id: editFaq.id, question: newQuestion, answer: newAnswer },
      update: (cache, { data: { updateFaqMutation } }) => {
        const existingFaqs = cache.readQuery({ query: GET_ALL_FAQS });
        const updatedFaqs = existingFaqs.getAllFaqsQuery.map(faq =>
          faq.id === updateFaqMutation.id ? updateFaqMutation : faq
        );
        cache.writeQuery({
          query: GET_ALL_FAQS,
          data: { getAllFaqsQuery: updatedFaqs },
        });
      }
    }).then(() => {
      handleClose();
    }).catch((err) => {
      console.error("Error updating FAQ: ", err);
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: " #A1368B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFaq({
          variables: { id },
          update: (cache, { data: { deletedFaqMutation } }) => {
            const existingFaqs = cache.readQuery({ query: GET_ALL_FAQS });
            const newFaqs = existingFaqs.getAllFaqsQuery.filter(faq => faq.id !== id);
            cache.writeQuery({
              query: GET_ALL_FAQS,
              data: { getAllFaqsQuery: newFaqs },
            });
          }
        }).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "The FAQ has been deleted.",
            icon: "success",
             confirmButtonColor: "#A1368B"
          });
        }).catch((err) => {
          console.error("Error deleting FAQ: ", err);
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the FAQ.",
            icon: "error"
          });
        });
      }
    });
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>
          <h5 style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>All FAQs</h5>
        </div>
        <div>
          <button type="button" className="btn text-white" style={{ background: " #A1368B" }} onClick={handleClickOpen}>ADD FAQ</button>
        </div>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <div className='d-flex flex-column justify-content-end'>
              <label htmlFor="question">Question</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Control
                  type="text"
                  name="question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
              </InputGroup> 

              <label htmlFor="answer">Answer:</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Control
                  type="text"
                  name="answer"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                />
              </InputGroup>

              <div className='d-flex flex-row mt-4 justify-content-end'>
                <Button className='text-white bg-danger fw-bold' onClick={handleClose}>Cancel</Button>
                <Button
                  style={{ background: "#A1368B", color: "white", marginLeft: "20px", fontWeight: "bold" }}
                  onClick={editMode ? handleUpdateFaq : handleCreateFaq} // Update or Create based on mode
                >  
                  {editMode ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className='mt-4' style={{ border: "2px solid #4F5B66" }}>
        <table className="table table-striped table-bordered" style={{ width: '100%', textAlign: 'center' }}>
          <thead className="thead-light">
            <tr>
              
              <th scope="col">QUESTION</th>
              <th scope="col">ANSWER</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead> 
          <tbody> 
            {faqData.length > 0 ? (  
              faqData.map((faq, index) => ( 
                <tr key={faq.id}> 

                  <td>{faq.question}</td>
                  <td>{faq.answer}</td> 
                  <td>
                    <EditIcon 
                      style={{ color: "black", cursor: "pointer", marginRight: "10px" }}  
                      onClick={() => handleEditOpen(faq)} // Open edit form
                    />
                    <DeleteIcon 
                      style={{ color: "red", cursor: "pointer" }} 
                      onClick={() => handleDelete(faq.id)}
                    />                  
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No FAQs available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
