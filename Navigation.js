import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Parrainages</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* Menu déroulant pour DGE */}
          <NavDropdown title="DGE" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/upload-electeurs">Importer fichier</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/saisie-candidats">Saisir candidat</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/ouverture-parrainage">Ouverture parrainage</NavDropdown.Item>
            
          </NavDropdown>

          {/* Liens pour Électeur et Candidat */}
          <NavDropdown title="Électeur" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/enregistrement-parrain">enregistrement d'un parrain</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/enregistrement-parrainage">enregistrement d'un parrainage</NavDropdown.Item>            
          </NavDropdown>
          <Nav.Link as={Link} to="/suivi-parrainages">Candidat</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;