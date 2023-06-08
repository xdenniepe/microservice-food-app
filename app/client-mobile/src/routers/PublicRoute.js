import React, { useState, useEffect } from "react";
import { MenuLayout, PrimaryLayout } from "../components/container";
import Base from "../components/container/base";
import { getLocalStorageItem, setLocalStorageItem } from "../service/helper";

const MainLayout = (props) => {
    const { layout, history, content, hideNavigation, title, setHasLoaded, refs, sidebarOpen, setSidebarOpen } = props;
    
    useEffect(() => {

        if(location.pathname === '/signup') {
            setLocalStorageItem('openpath', location.pathname);
            setHasLoaded(true);
        }

    }, [location])
    
    switch(layout) {
        case 'Menu': 
                return (
                    <MenuLayout history={history} setHasLoaded={setHasLoaded} >
                        <Base main={content} layout="ML" title={title} setHasLoaded={setHasLoaded} refs={refs} sidebarOpen={sidebarOpen} />
                    </MenuLayout>
                )
        case 'Primary':
                return (
                    <PrimaryLayout hideNavigation={hideNavigation} setHasLoaded={setHasLoaded} access="PUBLIC" title={title} to={-1} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} >
                        <Base main={content} layout="PL" title={title} setHasLoaded={setHasLoaded} refs={refs} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    </PrimaryLayout>
                )
        default: return <Base main={content} layout={""} title={title} setHasLoaded={setHasLoaded} refs={refs} sidebarOpen={sidebarOpen} />
    }
}

const PublicRoute = (props) => {
    const { children, layout, to, main, hideNavigation, title, setHasLoaded, refs, sidebarOpen, setSidebarOpen } = props;
    return (
        <MainLayout
            children={children}
            hideNavigation={hideNavigation}
            history={to}
            layout={layout}
            content={main}
            refs={refs}
            setHasLoaded={setHasLoaded}
            title={title}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
        />
    )
}

export default PublicRoute;