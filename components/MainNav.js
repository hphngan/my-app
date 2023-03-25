import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';


export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false)
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    let token = readToken();

    function logout() {
      setIsExpanded(false);
      removeToken();
      router.push('/login');
    }

    async function submitForm(e) {
        e.preventDefault();      
          
        router.push(`/artwork?title=true&q=${searchField}`);
        setSearchHistory(await addToHistory(`title=true&q=${searchField}`)) 
        setSearchField("")
        setIsExpanded(n => n = false);
    }
    function handleToggle (){
      setIsExpanded(n => n = !n);
    };

    function handleLinkClick() {
      setIsExpanded(n => n = false);
    };
    
  return (
    <>
    <Navbar expand="lg" className='fixed-top navbar-dark bg-primary' expanded={isExpanded}>
      <Container>
        <Navbar.Brand>Phuong Ngan Huynh</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior ><Nav.Link onClick={handleLinkClick} active={router.pathname === "/"}>Home</Nav.Link></Link>
            {token && <Link href="/search" passHref legacyBehavior ><Nav.Link onClick={handleLinkClick} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>}
          </Nav>          
          &nbsp;
          {token &&
            <Form className="d-flex" onSubmit={submitForm}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)} 
                />
                <Button className='btn btn-success' type='submit' >Search</Button>
              </Form>
            }
            &nbsp;
            {token &&
              <Nav>
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior ><NavDropdown.Item onClick={handleLinkClick} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item></Link>
                  <Link href="/history" passHref legacyBehavior ><NavDropdown.Item onClick={handleLinkClick} active={router.pathname === "/history"}>Search History</NavDropdown.Item></Link>
                  <NavDropdown.Item onClick={(e) => logout()}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            
            }

            {!token && 
              <Nav >
                <Link href="/register" passHref legacyBehavior active><Nav.Link onClick={(e) => setIsExpanded(false)}>Register</Nav.Link></Link>
                <Link href="/login" passHref legacyBehavior active><Nav.Link onClick={(e) => setIsExpanded(false)}>Log In</Nav.Link></Link>
              </Nav>
            }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br /> <br /><br />
    </>
  );
}

