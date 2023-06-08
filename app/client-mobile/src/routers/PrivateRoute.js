import React from "react";
import { Navigate } from "react-router-dom";
import { Base, MenuLayout, PrimaryLayout } from "../components/container";
import OrderContextProvider from "../context/orderContext";
import LocationContextProvider from "../context/locationContext";
import ProductContextProvider from "../context/productContext";


const MainLayout = (props) => {
    const { layout, history, title, content, hideNavigation, to, setHasLoaded, refs, sidebarOpen, setSidebarOpen } = props;

    switch (layout) {
        case 'Menu':
            return (
                <OrderContextProvider>
                    <ProductContextProvider>
                        <MenuLayout history={history} setHasLoaded={setHasLoaded} >
                            <Base main={content} layout="ML" title={title} setHasLoaded={setHasLoaded} refs={refs} sidebarOpen={sidebarOpen} />
                        </MenuLayout>
                    </ProductContextProvider>
                </OrderContextProvider>
            )
        case 'Primary':
            return (
                <OrderContextProvider>
                    <ProductContextProvider>
                        <LocationContextProvider>
                            <PrimaryLayout title={title} hideNavigation={hideNavigation} to={to} access="PRIVATE" setHasLoaded={setHasLoaded} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} >
                                <Base main={content} layout="PL" title={title} setHasLoaded={setHasLoaded} refs={refs} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                            </PrimaryLayout>
                        </LocationContextProvider>
                    </ProductContextProvider>
                </OrderContextProvider>
            )
        default: return <Base main={content} layout={""} title={title} setHasLoaded={setHasLoaded} refs={refs} sidebarOpen={sidebarOpen}/>
    }
}

const PrivateRoute = (props) => {
    const { token, children, layout, history, title, main, hideNavigation, to, setHasLoaded, refs, sidebarOpen, setSidebarOpen } = props;

    return token ?
        <MainLayout
            children={children}
            content={main}
            hideNavigation={hideNavigation}
            history={history}
            layout={layout}
            refs={refs}
            setHasLoaded={setHasLoaded}
            title={title}
            to={to}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
        />
        :
        <Navigate to="/" />;
}

export default PrivateRoute;