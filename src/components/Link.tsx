import { TPath } from "../interfaces/Paths";
import { Link as ReactLink, LinkProps } from "react-router-dom";
import { NavItem } from "react-bootstrap";

const Link: React.FC<LinkProps & { to: TPath }> = ({ to, className = "nav-link", ...rest }) => (
    <NavItem>
        <ReactLink className={className} to={to} {...rest} />
    </NavItem>
);

export default Link;