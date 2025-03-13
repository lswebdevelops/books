import React from "react";
import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaUser, FaUserTie } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logohw.png";
import { useNavigate, Link } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import SearchBox from "./SearchBox";
import { resetCart } from "../slices/cartSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="logo of HW" className="logo-hw" />
          </Navbar.Brand>

          <Navbar.Brand href="/" className="d-none d-md-block">
            Home &nbsp;
          </Navbar.Brand>

          {/* Poemas link ao lado de Harry Wiese */}
          <Navbar.Brand as={Link} to="/poems">
            Poemas &nbsp;
          </Navbar.Brand>
          {/* <Navbar.Brand as={Link} to="/books">
            Livros &nbsp;
          </Navbar.Brand> */}
          <Navbar.Brand as={Link} to="/biography">
            Sobre o Autor&nbsp;
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              {/* <Nav.Link href="/cart">
                <FiHeart style={{ fontSize: "1.2rem" }} />
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link> */}
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <NavDropdown.Item as={Link} to="/profile">
                      Meu Perfil
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Sair
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUser /> Logar
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={<FaUserTie size={20} />} id="adminmenu">
                  <NavDropdown.Item as={Link} to="/admin/productlist">
                    Editar Livros
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/poemlist">
                    Editar Poemas
                  </NavDropdown.Item>{" "}
                  <NavDropdown.Item as={Link} to="/admin/userlist">
                    Editar Usuários
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/email-list">
                    Email Usuários
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
