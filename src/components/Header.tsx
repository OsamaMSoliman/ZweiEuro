import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUser } from "reactfire";
import { Logout } from "../firebase/utils/fireLogout";
import { useTranslation } from "react-i18next";

export default function () {
    const { data: user } = useUser();
    const [t] = useTranslation();

    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
                <Container fluid>
                    <Navbar.Brand><h1>{t("app-nav-bar.title")}</h1></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav variant="underline" defaultActiveKey="/">
                            <Nav.Item>
                                <Link className="nav-link" to="/">{t("app-nav-bar.home-link")}</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to="/upload">{t("app-nav-bar.upload-link")}</Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {t("app-nav-bar.sign-in-label")} :
                            <Button variant="outline-dark ms-2" onClick={Logout} disabled={!user}>
                                {user?.displayName}
                            </Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}