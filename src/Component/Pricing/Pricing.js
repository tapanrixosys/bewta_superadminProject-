import React, { useState } from 'react';
import {
  Button, Dialog, DialogContent, useMediaQuery, useTheme,Card
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form, InputGroup } from 'react-bootstrap';

export default function Pricing() {
  const [open, setOpen] = useState(false);
  const [plans, setPlans] = useState([
    { planname: 'Gold', description: 'All need access', price: '350', currency: 'INR', duration: 'monthly' }
  ]); // The list of plans
  const [selectedPlan, setSelectedPlan] = useState({
    planname: '',
    description: '',
    price: '',
    currency: '',
    duration: ''
  });
  const [isEditing, setIsEditing] = useState(false); // To track if we are editing a plan

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (plan) => {
    if (plan) {
      setSelectedPlan(plan);  // Set the selected plan for editing
      setIsEditing(true);     // Set the flag for editing mode
    } else {
      setSelectedPlan({ planname: '', description: '', price: '', currency: '', duration: '' }); // Clear form for adding a new plan
      setIsEditing(false);    // Set the flag for adding mode
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveOrUpdate = () => {
    if (isEditing) {
      // Update the existing plan
      setPlans(plans.map(plan => 
        plan.planname === selectedPlan.planname ? selectedPlan : plan
      ));
    } else {
      // Add a new plan
      setPlans([...plans, selectedPlan]);
    }
    handleClose();  // Close the modal after saving or updating
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
                  value={selectedPlan.planname}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, planname: e.target.value })}
                />
              </InputGroup>

              <label htmlFor="exampleInputEmail1">Plan Description</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Control
                  type="text"
                  name="description"
                  value={selectedPlan.description}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, description: e.target.value })}
                />
              </InputGroup>

              <label htmlFor="exampleInputEmail1">Plan Price</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Control
                  type="text"
                  name="price"
                  value={selectedPlan.price}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, price: e.target.value })}
                />
              </InputGroup>

              <label htmlFor="exampleInputEmail1">Currency</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Select
                  name="currency"
                  value={selectedPlan.currency}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, currency: e.target.value })}
                >
                  <option value="">Choose Currency</option>
                  <option value="INR">INR</option>
                  <option value="USDT">USDT</option>
                </Form.Select>
              </InputGroup>

              <label htmlFor="exampleInputEmail1">Duration</label>
              <InputGroup className="mb-3" style={{ width: 500, maxWidth: '100%' }} size="lg">
                <Form.Select
                  name="duration"
                  value={selectedPlan.duration}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, duration: e.target.value })}
                >
                  <option value="">Choose Duration</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="halfyearly">Half-Yearly</option>
                  <option value="yearly">Yearly</option>
                  <option value="daily">Daily</option>
                </Form.Select>
              </InputGroup>

              <div className='d-flex flex-row mt-4 justify-content-end'>
                <Button className='text-white bg-danger fw-bold' onClick={handleClose}>Cancel</Button>
                <Button
                  style={{ background: "#A1368B", color: "white", marginLeft: "20px", fontWeight: "bold" }}
                  onClick={handleSaveOrUpdate}
                >
                  {isEditing ? 'Update' : 'Save'}
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
              <th scope="col">Plan Name</th>
              <th scope="col">Plan Description</th>
              <th scope="col">Plan Price</th>
              <th scope="col">Plan Duration</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, index) => (
              <tr key={index}>
                <td>{plan.planname}</td>
                <td>{plan.description}</td>
                <td>{plan.price}</td>
                <td>{plan.duration}</td>
                <td>
                  <EditIcon
                    style={{ color: "black", cursor: "pointer", marginRight: "10px" }}
                    onClick={() => handleClickOpen(plan)}
                  />
                  <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
