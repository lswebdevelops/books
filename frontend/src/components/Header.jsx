import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaUser, FaUserTie, FaHome, FaBook, FaProjectDiagram, FaFeatherAlt, FaUserAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import logo from "../assets/logohw.png";
import SearchBox from "./SearchBox";

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
    {/* Logo */}
    <Navbar.Brand href="/">
      <img src={logo} alt="logo of HW" className="logo-hw" />
    </Navbar.Brand>
   

    {/* Icons (Static on Left) */}
    <Nav className="me-auto d-flex flex-row nav-header">
  <Nav.Link as={Link} to="/" className="d-flex align-items-center me-3">
    <FaHome size={20} className="d-lg-none" />
    <span className="ms-2 d-none d-lg-inline">Home</span>
  </Nav.Link>
  <Nav.Link as={Link} to="/poems" className="d-flex align-items-center me-3">
    <FaFeatherAlt size={20} className="d-lg-none" />
    <span className="ms-2 d-none d-lg-inline">Poemas</span>
  </Nav.Link>
  <Nav.Link as={Link} to="/books" className="d-flex align-items-center me-3">
    <FaBook size={20} className="d-lg-none" />
    <span className="ms-2 d-none d-lg-inline">Livros</span>
  </Nav.Link>
  <Nav.Link as={Link} to="/upcoming" className="d-flex align-items-center me-3">
    <FaProjectDiagram size={20} className="d-lg-none" />
    <span className="ms-2 d-none d-lg-inline">Projetos</span>
  </Nav.Link>
  <Nav.Link as={Link} to="/blogs" className="d-flex align-items-center">
    <FaUserAlt size={20} className="d-lg-none" />
    <span className="ms-2 d-none d-lg-inline">Blog</span>
  </Nav.Link>
  <Nav.Link as={Link} to="/biography" className="d-flex align-items-center">
    <FaUserAlt size={20} className="d-lg-none" />
    <span className="ms-2 d-none d-lg-inline">Autor</span>
  </Nav.Link>
  
</Nav>


 {/* Toggle for Collapsible Section */}
 <Navbar.Toggle aria-controls="user-navbar-collapse" />

    {/* Collapse for SearchBox and Dropdowns (On Right) */}
    <Navbar.Collapse id="user-navbar-collapse">
      <Nav className="ms-auto">
        {/* Search Box */}
        <SearchBox />

        {/* User Dropdown */}
        {userInfo ? (
          <NavDropdown title={userInfo.name} id="username">
            <NavDropdown.Item as={Link} to="/profile">
              Meu Perfil
            </NavDropdown.Item>
            <NavDropdown.Item onClick={logoutHandler}>
              Sair
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Nav.Link as={Link} to="/login" className="d-flex align-items-center">
            <FaUser />
            <span className="ms-2 d-none d-lg-inline">Login</span>
          </Nav.Link>
        )}

        {/* Admin Dropdown */}
        {userInfo?.isAdmin && (
          <NavDropdown title={<FaUserTie size={20} />} id="adminmenu">
            <NavDropdown.Item as={Link} to="/admin/productlist">
              Editar Livros
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/poemlist">
              Editar Poemas
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/bloglist">
              Editar Blogs
            </NavDropdown.Item>
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
