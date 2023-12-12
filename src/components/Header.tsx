import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUser } from "reactfire";
import { Logout } from "../utils/logout";

export default function () {
    const { data: user } = useUser();

    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
                <Container fluid>
                    <Navbar.Brand>Navigation bar</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav variant="underline" defaultActiveKey="/">
                            <Nav.Item>
                                <Link className="nav-link" to="/">Home</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to="/upload">Upload</Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as:{" "}
                            <Button variant="outline-dark" onClick={Logout} disabled={!user}>
                                {user?.displayName}
                            </Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}