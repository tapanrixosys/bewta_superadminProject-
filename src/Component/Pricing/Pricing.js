import React, { useEffect, useState } from 'react';
import {
  Card, Button, Dialog, DialogContent, useMediaQuery, useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form, InputGroup, } from 'react-bootstrap';
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';

const pricingPlan = gql`
 query {
  getAllPricingPlans {
    id
    planName
    planDescription
    planPrice
    planDuration
    currency
    priceId
    productId
    start_date
    end_date
  }
}
`;

const CREATE_PRICE_PLAN_MUTATION = gql`
  mutation CreatePricePlan(
    $planName: String!,
    $planDescription: String!,
    $planPrice: Float!,
    $planDuration: String!,
    $currency: String!,
    $priceId: String!,
    $productId: String!,
    $start_date: String!,
    $end_date: String!
  ) {
    createPricePlanMutation(
      planName: $planName,
      planDescription: $planDescription,
      planPrice: $planPrice,
      planDuration: $planDuration,
      currency: $currency,
      priceId: $priceId,
      productId: $productId,
      start_date: $start_date,
      end_date: $end_date
    ) {
      planName
      planDescription
      planPrice
      planDuration
      currency
      priceId
      productId
      start_date
      end_date
    }
  }
`;

const DELETE_PRICE_PLAN_MUTATION = gql`    
  mutation DeletePricePlan($id: String!) {
    deletePricePlanMutation(id: $id) {
      planName
      planDescription
      planPrice
      planDuration
      currency
      productId
      start_date
      end_date
    }
  }
`;
const UPDATE_PRICE_PLAN_MUTATION = gql`
  mutation UpdatePricePlan(
    $id: String!,
    $planName: String!,
    $planDescription: String!,
    $planPrice: Float!,
    $planDuration: String!,
    $currency: String!,
    $priceId: String!,
    $productId: String!,
    $start_date: String!,
    $end_date: String!
  ) {
    updatePricePlanMutation(
      id: $id,
      planName: $planName,
      planDescription: $planDescription,
      planPrice: $planPrice,
      planDuration: $planDuration,
      currency: $currency,
      priceId: $priceId,
      productId: $productId,
      start_date: $start_date,
      end_date: $end_date
    ) {
      id
      planName
      planDescription
      planPrice
      planDuration
      currency
      priceId
      productId
      start_date
      end_date
    }
  }
`;



export default function Pricing() {

  const [open, setOpen] = useState(false);
  const [allPricingPlan, setAllPricingPlan] = useState([]);

  const [planName, setPlanName] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [planPrice, setPlanPrice] = useState('');
  const [planDuration, setPlanDuration] = useState('');
  const [currency, setCurrency] = useState('');
  const [priceId, setPriceId] = useState('');
  const [productId, setProductId] = useState('');
  const [start_date, setStartDate] = useState('01.10.2024');
  const [end_date, setEndDate] = useState('01.10.2025');

  const [editMode, setEditMode] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState(null);


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  // get price plan
  const [fetchPricingPlans, { data, error }] = useLazyQuery(pricingPlan);
  // create price plan
  const [createPricePlan, { loading: creating }] = useMutation(CREATE_PRICE_PLAN_MUTATION, {
    onCompleted: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Price Plan created successfully.',
        confirmButtonColor: " #A1368B",
        icon: 'success',
        confirmButtonText: 'OK'
      });
      handleClose();
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error!',
        text: `Plan creation failed: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    },
    refetchQueries: [{ query: pricingPlan }],
  });

  // delete price plan
  const [deletePricePlan] = useMutation(DELETE_PRICE_PLAN_MUTATION, {
    onCompleted: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Price Plan deleted successfully.',
        confirmButtonColor: " #A1368B",
        icon: 'success',
        confirmButtonText: 'OK'
      });
      handleClose();
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error!',
        text: `Plan deletion failed: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    },
    refetchQueries: [{ query: pricingPlan }],
  });


  // update price plan 
  const [updatePricePlan] = useMutation(UPDATE_PRICE_PLAN_MUTATION, {
    onCompleted: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Price Plan updated successfully.',
        confirmButtonColor: " #A1368B",
        icon: 'success',
        confirmButtonText: 'OK'
      });
      handleClose();
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error!',
        text: `Plan updation failed: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    },
    refetchQueries: [{ query: pricingPlan }],
  });

  useEffect(() => {
    if (data && data.getAllPricingPlans) {
      setAllPricingPlan(data.getAllPricingPlans);
    }
  }, [data, error]);

  useEffect(() => {
    fetchPricingPlans();
  }, [fetchPricingPlans]);


  const handleClickOpen = (plan = null) => {
    setOpen(true);
    if (plan) {
      setEditMode(true);
      setCurrentPlanId(plan.id);
      // Populate form fields with the plan's details
      setPlanName(plan.planName);
      setPlanDescription(plan.planDescription);
      setPlanPrice(plan.planPrice);
      setPlanDuration(plan.planDuration);
      setCurrency(plan.currency);
      setPriceId(plan.priceId);
      setProductId(plan.productId);
      setStartDate('01.10.2024');
      setEndDate('01.10.2025');
    } else {
      setEditMode(false);
      resetFormFields();
    }
  };

  const handleClose = () => {
    setOpen(false);
    resetFormFields();
  };

  const resetFormFields = () => {
    setPlanName('');
    setPlanDescription('');
    setPlanPrice('');
    setPlanDuration('');
    setCurrency('');
    setPriceId('');
    setProductId('');
    setStartDate('');
    setEndDate('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      deletePricePlan({ variables: { id } });
    }
  };

  const handleSave = () => {
    if (editMode) {
      // Update the price plan
      updatePricePlan({
        variables: {
          id: currentPlanId,
          planName,
          planDescription,
          planPrice: parseFloat(planPrice),
          planDuration,
          currency,
          priceId,
          productId,
          start_date,
          end_date,
        },
      });
    } else {
      // Create a new price plan 
      createPricePlan({
        variables: {
          planName,
          planDescription,
          planPrice: parseFloat(planPrice),
          planDuration,
          currency,
          priceId,
          productId,
          start_date,
          end_date,
        },
      });
    }
  };


  return (
    <div className="container px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div><h5 style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>All Price</h5></div>
        <div>
          <button type="button" className="btn text-white" style={{ background: "#A1368B" }} onClick={() => handleClickOpen(null)}>
            ADD PRICE
          </button>
        </div>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent> 
            <div className='d-flex flex-column justify-content-end'>
              <label htmlFor="exampleInputEmail1">Plan Name</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Control
                  type="text"
                  name="planname"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                />
              </InputGroup>

              <label htmlFor="exampleInputEmail1">Plan Description</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Control
                  type="text"
                  name="planDescription"
                  value={planDescription}
                  onChange={(e) => setPlanDescription(e.target.value)}
                />
              </InputGroup>

              <label htmlFor="exampleInputEmail1">Plan Price</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Control
                  type="text"
                  name="planPrice"
                  value={planPrice}
                  onChange={(e) => setPlanPrice(e.target.value)}
                />
              </InputGroup>

              <label htmlFor="exampleInputEmail1">Currency</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Select
                  name="Choose Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="" >Choose Currency</option>
                  <option value="USD">USD</option>

                </Form.Select>
              </InputGroup>

              <label htmlFor="exampleInputEmail1">Duration</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Select
                  name="Choose Duration"
                  value={planDuration}
                  onChange={(e) => setPlanDuration(e.target.value)}
                >
                  <option value="" >Choose Duration</option>
                  <option value="1 month">Monthly</option>
                  <option value="4 months">Quarterly</option>
                  <option value="6 months">Half-Yearly</option>
                  <option value="1 year">Yearly</option>
                </Form.Select>
              </InputGroup>

              <div className='d-flex flex-row mt-4 justify-content-end'>
                <Button className='text-white bg-danger fw-bold' onClick={handleClose}>Cancel</Button>
                <Button
                  style={{ background: "#A1368B", color: "white", marginLeft: "20px", fontWeight: "bold" }}
                  onClick={handleSave}
                >{editMode ? 'Update Plan' : 'Save Plan'}</Button>

              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className='mt-4' style={{ border: "2px solid #4F5B66" }}>
        <table className="table table-striped table-bordered" style={{ width: '100%', textAlign: 'center' }}>
          <thead className="thead-light">
            <tr>
              <th scope="col">Plan Name</th>
              <th scope="col">Plan Description</th>
              <th scope="col">Plan Price</th>
              <th scope="col">Plan Duration</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allPricingPlan.length > 0 ? (
              allPricingPlan.map((price, index) => (
                <tr key={index}>
                  <td>{price.planName}</td>
                  <td>{price.planDescription}</td>
                  <td>{price.planPrice}</td>
                  <td>{price.planDuration}</td>
                  <td>
                    <EditIcon style={{ color: "black", cursor: "pointer", marginRight: "10px" }} onClick={() => handleClickOpen(price)} />
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete(price.id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
      <Toaster />
    </div>
  );
}
