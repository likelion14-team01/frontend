import { Outlet } from "react-router-dom";

import Footer from "../components/footer/Footer.jsx";

export default function RootLayout() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
}