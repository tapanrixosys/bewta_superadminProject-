import React, { useEffect, useState } from 'react';
import { Card, Button, Dialog, DialogContent, useMediaQuery, useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form, InputGroup, } from 'react-bootstrap';
import { gql, useLazyQuery,useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";

const pricingPlan  = gql`
 query {
  getAllPricingPlans {
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


export default function Pricing() {

  const [open, setOpen] = useState(false);
  const [allPricingPlan,setAllPricingPlan]=useState([]);
  const [planName, setPlanName] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [planPrice, setPlanPrice] = useState('');
  const [planDuration, setPlanDuration] = useState('');
  const [currency, setCurrency] = useState('');
  const [priceId, setPriceId] = useState('');
  const [productId, setProductId] = useState('');
  const [start_date, setStartDate] = useState('01.10.2024');
  const [end_date, setEndDate] = useState('01.10.2025');


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [fetchPricingPlans, { data, error }] = useLazyQuery(pricingPlan);
  const [createPricePlan, { loading: creating }] = useMutation(CREATE_PRICE_PLAN_MUTATION, {
    onCompleted: () => {
      fetchPricingPlans(); // Refresh the pricing plans after creation
      handleClose(); // Close the dialog
      toast.success('Pricing plan created successfully!'); 
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`); // Show error message
    },
  });

  useEffect(() => {
    if (data && data.getAllPricingPlans) {
      setAllPricingPlan(data.getAllPricingPlans);
    }
  }, [data, error]);

  useEffect(() => {
    fetchPricingPlans();
  }, [fetchPricingPlans]);
  

  const handleClickOpen = (plan) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                  <option value="INR">INR</option>
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
                  onClick={() => {
                    createPricePlan({
                      variables: {
                        planName,
                        planDescription,
                        planPrice: parseFloat(planPrice), // Convert to float
                        planDuration,
                        currency,
                        priceId,
                        productId,
                        start_date,
                        end_date,
                      },
                    });
                  }}
                >Create</Button>

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
                <EditIcon style={{ color: "black", cursor: "pointer", marginRight: "10px" }} />
                <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
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
     <Toaster/>
    </div>
  );
}
