import {Outlet} from "react-router-dom";
import AppHeader from "../header/AppHeader.tsx";
import {MainContainer} from "./styles.ts";

function Layout() {
    return (
        <div style={{alignItems: "center", display: "flex", flexDirection: "column"}}>
            <AppHeader />
            <MainContainer>
                <Outlet />
            </MainContainer>
        </div>
    )
}

export default Layout
