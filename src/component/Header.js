import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import "../assets/css/header.css";

class Header extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <div className="container-fluid m-mx-5">
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                {/* <img
                  alt="My Rizq"
                  style={{ height: "55px" }}
                  src={require("assets/img/brand/logo.png")}
                />
                Home */}
              </NavbarBrand>
              {/* <p className="text-white">Home</p> */}
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon pl-3" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  {/* mobile navbar */}
                  <Row>
                    <Col className="" xs="6">
                      {/* <Link to="/"> */}
                      <NavbarBrand
                        className="text-white homeName"
                        to="/"
                        tag={Link}
                      >
                        <p onClick={() => console.log("Home click")}>Home</p>
                      </NavbarBrand>
                      {/* </Link> */}
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <NavbarBrand
                          className="text-white homeName"
                          to="/"
                          tag={Link}
                        >
                          {/* <img
                            alt="My Rizq"
                            src={require("assets/img/brand/logo.png")}
                          /> */}
                          Home
                        </NavbarBrand>
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                  {/* mobile navbar end*/}
                </div>
                {/* Center navbar element */}
                <Nav
                  className="mx-auto  navbar-nav-hover align-items-lg-center"
                  navbar
                >
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <Link
                        to="/tracker"
                        className=" decoration-none margin-header"
                      >
                        <i className="ni ni-collection d-lg-none mr-1" />
                        <span className="nav-link-inner--text text-white">
                          Symptoms Tracker
                        </span>
                      </Link>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <Link
                        to="/blog"
                        className="text-white decoration-none margin-header"
                      >
                        <i className="ni ni-collection d-lg-none mr-1" />
                        <span className="nav-link-inner--text text-white">
                          my dashboard
                        </span>
                      </Link>
                    </DropdownToggle>
                  </UncontrolledDropdown>

                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <Link to="/signin" className="text-white decoration-none">
                        <i className="ni ni-collection d-lg-none mr-1" />
                        <span className="nav-link-inner--text text-white">
                          Login/Signup
                        </span>
                      </Link>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                </Nav>
                {/* right navbar element */}
                {/* <Nav className="" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <Link to="/signin" className="text-black">
                        <i className="ni ni-collection d-lg-none mr-1" />
                        <span className="nav-link-inner--text">Log in</span>
                      </Link>
                    </DropdownToggle>
                  </UncontrolledDropdown>

                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <Link to="/signup" className="text-black">
                      <Button className="btn btn-outline-success btn-icon bg-transparent">
                        <span className=" ml-1">Sign Up</span>
                      </Button>
                    </Link>
                  </NavItem>
                </Nav> */}
              </UncontrolledCollapse>
            </div>
          </Navbar>
        </header>
      </>
    );
  }
}

export default Header;
