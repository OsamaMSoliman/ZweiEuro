import {
    BrowserRouter, Routes,
    Route //as ReactRoute , RouteProps
} from "react-router-dom";
import AppLayout from "./AppLayout";
import Login from "../pages/Login";
import SlideShow from "../pages/SlideShow";
import Upload from "../pages/Upload";
import ProtectedRoutes from "./ProtectedRoutes";
import NotFound from "../pages/NotFound";
import TableView from "../pages/TableView";
import CardGrid from "../pages/CardGrid";
import { TPath } from "../interfaces/Paths";

// [ERROR] this is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>
// const Route: React.FC<RouteProps & { path?: TPath; }> = ({ path, ...rest }) => (
//     <ReactRoute path={path} {...rest} />
// );

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path={"/login" satisfies TPath} element={<Login />} />
                    <Route path={"/" satisfies TPath} element={<ProtectedRoutes />}>
                        <Route index element={<SlideShow />} />
                        <Route path={"/table" satisfies TPath} element={<TableView />} />
                        <Route path={"/grid" satisfies TPath} element={<CardGrid />} />
                        <Route path={"/upload" satisfies TPath} element={<Upload />} />
                    </Route>
                </Route>
                <Route path={"*" satisfies TPath} element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}