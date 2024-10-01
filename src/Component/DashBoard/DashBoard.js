import PropTypes from "prop-types";

// import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
// import Layout from "../../Components/VerticalLayout/index";

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  CardTitle,
} from "reactstrap";

import customer from "../../assets/image/customer.png";
import blueGraph from "../../assets/image/blue-graph.png";
import redGraph from "../../assets/image/red-graph.png";
import yellowGraph from "../../assets/image/yellow-graph.png";
import greenArrow from "../../assets/image/line-ascendant-graphic-of-zigzag-arrow.png";
import redArrow from "../../assets/image/trend.png";
import "./DashBoard.scss";

//import action
// import { getChartsData as onGetChartsData } from "../../store/actions"

// Pages Components

import SelectDate from "./SelectDate";
//i18n
import { withTranslation } from "react-i18next";


const Dashboard = (props) => {


  const [modal, setmodal] = useState(false);
  const [subscribemodal, setSubscribemodal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());


  const reports = [
    { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
    { title: "Revenue", iconClass: "bx-archive-in", description: "$35, 723" },
    {
      title: "Average Price",
      iconClass: "bx-purchase-tag-alt",
      description: "$16.2",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setSubscribemodal(true);
    }, 2000);
  }, []);

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("yearly");

  // useEffect(() => {
  //   setPeriodData(chartsData)
  // }, [chartsData])

  const onChangeChartPeriod = (pType) => {
    setPeriodType(pType);
    // dispatch(onGetChartsData(pType))
  };

  // const dispatch = useDispatch()
  // useEffect(() => {
  // dispatch(onGetChartsData("yearly"))
  // }, [dispatch])

  //meta title
  // document.title="Dashboard | Skote - React Admin & Dashboard Template";

  return (
    <React.Fragment >

      <div className="page-content"  style={{marginTop:"30px"}}>

        <div className="container-fluid">

          <div
            className="row grid d-flex "
            data-masonry='{"percentPosition": true }'
          >
            <div className="col-lg-3 grid-item">
              <SelectDate />
            </div>

            <div className=" col grid-item boxes d-flex">
              <div className="box-dashboard">
                <p>T</p>
              </div>
              <div className="box-dashboard">
                <p>PPTD</p>
              </div>
              <div className="box-dashboard">
                <p>WTD</p>
              </div>
              <div className="box-dashboard">
                <p>MTD</p>
              </div>
              <div className="box-dashboard">
                <p>YTD</p>
              </div>
            </div>

            <div className=" col-lg-3 grid-item d-flex  scoopWrapper">
              <h4 className="d-flex align-content-center scoop">Scoop Salon</h4>
              <div className="dropdown ml-10">
                <button
                  className="btn  dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "0.1px solid #ddd",
                  }}
                >
                  
                </button>
                <div
                  className="dropdown-menu "
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row grid" data-masonry='{"percentPosition": true }'>
              <div className="col-lg grid-item">
                <Card>
                  <CardTitle className="pt-2 mb-0">Total Sales</CardTitle>
                  <CardBody className="py-0">
                    <ol className="p-0 mb-1 text-muted">
                      <li>3 Tickets</li>
                      <li>2 Clients</li>
                      <li>298.90 Avg Total Sales Per Client</li>
                    </ol>
                    <div className="d-flex">
                      <h2>$246.25</h2>
                      <img
                        src={blueGraph}
                        style={{ height: "30px", marginLeft: "45px" }}
                      ></img>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className="col-lg grid-item">
                <Card>
                  <CardTitle className="pt-2 mb-0">Service Total</CardTitle>
                  <CardBody className="py-0">
                    <ol className="p-0 mb-1 text-muted">
                      <li>3 Tickets</li>
                      <li>2 Clients</li>
                      <li>298.90 Avg Total Sales Per Client</li>
                    </ol>
                    <div className="d-flex">
                      <h2>$375.00</h2>
                      <img
                        src={redGraph}
                        style={{ height: "30px", marginLeft: "45px" }}
                      ></img>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className="col-lg grid-item">
                <Card>
                  <CardTitle className="pt-2 mb-0">Retail Total</CardTitle>
                  <CardBody className="py-0">
                    <ol className="p-0 mb-1 text-muted">
                      <li>3 Tickets</li>
                      <li>2 Clients</li>
                      <li>298.90 Avg Total Sales Per Client</li>
                    </ol>
                    <div className="d-flex">
                      <h2>$32.00</h2>
                      <img
                        src={yellowGraph}
                        style={{ height: "30px", marginLeft: "15px" }}
                      ></img>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div className="col-lg-5 grid-item-width-2">
                <Card>
                  <CardTitle className="p-2 mb-0 fs-6">
                    <img
                      src={customer}
                      style={{
                        marginRight: "5px",
                        width: "20px",
                        height: "15px",
                      }}
                    ></img>
                    Clients
                  </CardTitle>
                  <hr className="mb-2"></hr>
                  <CardBody className="pb-0 mb-3 m-2">
                    <div className="progress" style={{ height: "20px" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "25%", backgroundColor: "#ff536a" }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        25
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="row grid" data-masonry='{"percentPosition": true }'>
              <div className="col-lg-7 grid-item">
                <Card>
                  <CardTitle className="space">
                    <div>
                      <p>5% Productivity</p>
                      <div
                        className="d-flex flex-direction-sm-column"
                        style={{
                          width: "60%",
                          justifyContent: "space-around",
                        }}
                      >
                        <div className="d-flex ">
                          <p>Booked</p>
                          <div className="blue-circle ml-10"></div>
                        </div>
                        <div className="d-flex">
                          <p>Available</p>
                          <div className="red-circle"></div>
                        </div>
                        <div className="d-flex">
                          <p>Schedulaed</p>
                          <div className="green-circle "></div>
                        </div>
                      </div>
                    </div>
                  </CardTitle>
                  <CardBody className="p-0 mb-4">
                    <div style={{ display: "flex" }}>
                      <p className="desc"></p>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: "20%" }}
                          aria-valuenow="20"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          20
                        </div>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "30%" }}
                          aria-valuenow="30"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          456
                        </div>
                        <div
                          className="progress-bar bg-prod-green"
                          role="progressbar"
                          style={{ width: "40%", background: "#a0cb5a" }}
                          aria-valuenow="40"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          658
                        </div>
                      </div>
                      <p className="desc"></p>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div className="col-lg grid-item negative-margin-70">
                <Card>
                  <CardTitle>Requests</CardTitle>
                  <hr className="m-0"></hr>
                  <CardBody>
                    <div className="d-flex green-arrow">
                      <h1 className="purple mt-10">12%</h1>
                      <img src={greenArrow}></img>
                    </div>
                    <div
                      className="progress"
                      style={{
                        marginTop: "20px",
                        height: "10px",
                        borderRadius: "10px",
                        background: "gray",
                      }}
                    >
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{
                          width: "50%",
                          background:
                            "linear-gradient(to right, #FF6D60 0%, #F7D060 100%)",
                        }}
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {/* 25 */}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className="col-lg grid-item negative-margin-70">
                <Card>
                  <CardTitle>Prebooked</CardTitle>
                  <hr className="m-0"></hr>
                  <CardBody>
                    <div className="d-flex red-arrow">
                      <h1 className="purple mt-10">16%</h1>
                      <img src={redArrow}></img>
                    </div>
                    <div
                      className="progress"
                      style={{
                        marginTop: "20px",
                        height: "10px",
                        borderRadius: "10px",
                        background: "gray",
                      }}
                    >
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{
                          width: "70%",
                          background:
                            "linear-gradient(to right, #FF6D60 0%, #F7D060 100%)",
                        }}
                        aria-valuenow="70"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {/* 25 */}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div
              className="row grid negative-margin-70"
              data-masonry='{"percentPosition": true }'
            >
              <div className="col-lg-7 grid-item">
                <Card className="border">
                  {/* <CardTitle className="h5">
                    Services Total By Category
                  </CardTitle> */}
                  <h6 className="mb-0 p-3">Services Total By Category</h6>
                  <hr className="mt-0 "></hr>
                  <CardBody>
                    <div
                      className="align-items-center py-2"
                      style={{ display: "flex" }}
                    >
                      <p className="desc">Color (200)</p>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          25
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div
                      className="align-items-center py-2"
                      style={{ display: "flex" }}
                    >
                      <p className="desc">Color (20)</p>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar "
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          25
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div
                      className="align-items-center py-2"
                      style={{ display: "flex" }}
                    >
                      <p className="desc">Cut (184)</p>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar "
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          25
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div
                      className="align-items-center py-2"
                      style={{ display: "flex" }}
                    >
                      <p className="desc">Treatment (76)</p>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar "
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          25
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div
                      className="align-items-center py-2"
                      style={{ display: "flex" }}
                    >
                      <p className="desc">Blend cut (37)</p>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar "
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          25
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div
                      className="align-items-center py-2"
                      style={{ display: "flex" }}
                    >
                      <p className="desc">Makeup (58)</p>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar "
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          25
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div
                      className="align-items-center py-2"
                      style={{ display: "flex" }}
                    >
                      <p className="desc"> Waxing (989)</p>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar "
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          25
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div
                      className="align-items-center py-2"
                      style={{ display: "flex" }}
                    >
                      <p className="desc">Styling (251)</p>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar "
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          25
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div
                      className="align-items-center py-2"
                      style={{ display: "flex" }}
                    >
                      <p className="desc"> Extensions (624)</p>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar "
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          25
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div
                      className="align-items-center py-2"
                      style={{ display: "flex" }}
                    >
                      <p className="desc"> Day Care (359)</p>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar "
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          25
                        </div>
                      </div>
                    </div>
                    <hr />
                    <button
                      className="btn w-100 m-20"
                      style={{
                        border: "1px solid #42b4a7",
                        color: "#42b4a7",
                      }}
                    >
                      Last 7 days
                    </button>
                  </CardBody>
                </Card>
              </div>

              <div className="col-lg-5 grid-item">
                <Card>
                  <CardBody>
                    <div className="pricesWrapper">
                      <div className="prices">
                        <h5 className="mb-0">Service sale per hour</h5>
                        <p></p>
                      </div>
                      <h1 className="blue-font">$145</h1>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="pricesWrapper">
                      <div className="prices">
                        <h5 className="mb-0">Upsell</h5>
                        <p className="tickets">1 Ticket (33%)</p>
                      </div>
                      <h1 className="blue-font">$246</h1>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="pricesWrapper">
                      <div className="clients">
                        <h5 className="mb-0">Services per Client</h5>
                        <p className="tickets">879 Services / 164 Client</p>
                      </div>
                      <h1 className="blue-font">$879</h1>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="pricesWrapper">
                      <div className="clients">
                        <h5 className="mb-0">Services per Client</h5>
                        <p className="tickets">
                          $154,545,28 Services Sales / 879
                        </p>
                      </div>
                      <h1 className="blue-font">$356.25</h1>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="pricesWrapper">
                      <div className="clients">
                        <h5 className="mb-0">Services per Client</h5>
                        <p className="tickets">879 Services / 164 Client</p>
                      </div>
                      <h1 className="blue-font">$24.92</h1>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="pricesWrapper">
                      <div className="clients">
                        <h5 className="mb-0">Services per Client</h5>
                        <p className="tickets">Qtv</p>
                      </div>
                      <h1 className="blue-font">$10.58</h1>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
