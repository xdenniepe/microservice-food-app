import React, { useContext, useRef, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// Routes
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";


// Pages
import Order from "../pages/order";
import Errors from "../pages/errors";
import ForgotPassword from "../pages/forgot-password";
import PurchaseHistory from "../pages/purchase-history";
import OrderReview from "../pages/order-review";
import ResetCode from "../pages/reset-code";
import ResetPassword from "../pages/reset-password";
import Menu from "../pages/menu";
import Product from "../pages/product"
import Receipt from "../pages/receipt";
import Signin from "../pages/sign-in";
import Signup from "../pages/sign-up";
import Settings from "../pages/settings";
import Notification from "../pages/notification-box";
import Contact from "../pages/contact";
import TermsConditions from "../pages/terms-conditions";
import PrivacyPolicy from "../pages/privacy-policy";
import Success from "../pages/success";
import Payment from "../pages/payment";
import AccessibilityStatement from "../pages/accessibility-statement";
import TwoFactor from "../pages/two-factor";
import Location  from "../pages/location";
import CheckOut from "../pages/checkout-location";
import Rewards from "../pages/rewards";
import RewardsClaim from "../pages/rewards/reward-claim";
import Home from "../pages/home";
import PrivacyAccountManagement from "../pages/privacy-management";
import ProcessPayment from "../pages/process-payment";
import Privacy from "../pages/privacy";
import VendoLocation from "../pages/location-based";
import Dashboard from "../pages/dashboard";
import LoyaltyProgress from "../pages/loyalty-progress";
import AllTiers from "../pages/loyalty-progress/seeAllTiers";
import LoyaltyRewardClaim from "../pages/loyalty-progress/rewardClaim";
import LocationMenu from "../pages/location-menu";
import AccountDeletionMessage from "../pages/account-deletion";
import AccountDeletionFeedback from "../pages/account-deletion/account-deletion-feedback";
import PaymentMethod from "../pages/payment-method";
import NotificationDirectory from "../pages/notification-box/notification-directory";
import LinkExpired from "../pages/errors/link-expired";
import ResetExpired from "../pages/errors/reset-pass-expired";
import ChangeLanguage from "../pages/changeLanguage";
import UnlinkSocialMedia from "../pages/unlink-social-media";
import Favorites from "../pages/favorites";
import UFOGame from "../pages/ar-games/ufo";
import ARDashboard from "../pages/ar-games";
import BowlingGame from "../pages/ar-games/bowling";
import LocationDirection from "../pages/location-menu/location-direction";
import { getLocalStorageItem } from "../service/helper";

const AppRoutes = () => {
    const { state } = useContext(AuthContext);
    const { token } = state;
    const refs      = useRef(null);
    const { t } = useTranslation(['routers']);

    const [ hasLoaded, setHasLoaded ]     = useState(false);
    const [ sidebarOpen, setSidebarOpen ] = useState(false);

    useEffect(() => {
        if(refs.current && hasLoaded){
            refs.current.focus();
            setHasLoaded(false);
        }
    });

    const guest = getLocalStorageItem('guestLogin');

    return (
        <Routes>
            <Route path="/"                       element={token ? <Navigate to="/dashboard" /> : <Navigate to ="/home" />} />
            {/* PUBLIC ROUTES */}
            
            <Route path="/home"                   element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={''}     main={Home}             title="HOME"/>} />
            <Route path="/login"                  element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={''}     main={Signin}           title="SIGN IN"/>} to={-1} />
            <Route path="/forgotpassword"         element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Menu'} main={ForgotPassword}   title="RESET PASSWORD" to={'/'} />} />
            <Route path="/resetcode"              element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Menu'} main={ResetCode}        title="AUTHENTICATION: RESET CODE" />} />
            <Route path="/resetpassword/:code"    element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Menu'} main={ResetPassword}    title="RESET PASSWORD" />} />
            <Route path="/signup"                 element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Menu'} main={Signup}           title="SIGN UP" to={'/'} />} />
            <Route path="/success"                element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Menu'} main={Success}          title="SUCCESS" to={'/'} />} />
            <Route path="/verification"           element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Menu'} main={TwoFactor}        title="TWO FACTOR AUTHENTICATION" />} />
            <Route path="/changeLanguage"         element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Menu'} main={ChangeLanguage}   title="SELECT LANGUAGE" to={-1} />} />

            {/* PRIVATE ROUTES */}
            <Route path="/dashboard"              element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Dashboard}        token={token} />} />
            <Route path="/menu"                   element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Menu}             token={token} title="PLACE YOUR ORDER"  to={-1} />} />
            <Route path="/locationmenu"           element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={LocationMenu}     token={token} to={-1} />} />
            <Route path="/menu/product/:id"       element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Product}          token={token} title="PRODUCT DETAILS"   to={-1} hideNavigation={true} />} />
            <Route path="/locationmenu/location-direction"           element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={LocationDirection}     token={token} to={-1} />} />
            
            <Route path="/order"                  element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Order}            token={token} title="YOUR CART"         to={-1} />} />
            <Route path="/orderreview"            element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={OrderReview}      token={token} title="ORDER REVIEW"      to={-1} />} />
            <Route path="/payment"                element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Payment}          token={token} title={t('PROCESS PAYMENT')}   to={-1} />} />
            <Route path="/purchasehistory"        element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={PurchaseHistory}  token={token} title="PURCHASE HISTORY"  to={-1} />} />
            <Route path="/receipt"                element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Receipt}          token={token} title="RECEIPT"           to={-1} />} />
            <Route path="/receipt/view/:id"       element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Receipt}          token={token} title="RECEIPT"           to={-1} />} />
            <Route path="/locationbased"          element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={VendoLocation}    token={token}                           to={'/'} />} />
            <Route path="/settings"               element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Settings}         token={token} title={t('EDIT PROFILE')} to={'/'} hideNavigation={true} />} />

            <Route path="/favorites"              element={guest === "guest" ? <Navigate to="/dashboard" /> : <PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Favorites}  token={token}  title={t('FAVORITES')} to={-1} />} />
            <Route path="/loyaltyprogress"        element={guest === "guest" ? <Navigate to="/dashboard" /> : <PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={LoyaltyProgress}  token={token}                           to={'/'} />} />
            <Route path="/loyaltyprogress/rewardClaim/:uniqueKey" element={guest === "guest" ? <Navigate to="/dashboard" /> : <PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={LoyaltyRewardClaim}  token={token}         to={-1} />} />
            <Route path="/loyaltyprogress/seeAllTiers"        element={guest === "guest" ? <Navigate to="/dashboard" /> : <PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={AllTiers}  token={token}   to={-1} />} />
            <Route path="/checkout"               element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Menu'} main={CheckOut}            token={token} title="CHECK OUT"         to={-1} />} />
            <Route path="/rewards"                element={guest === "guest" ? <Navigate to="/dashboard" /> : <PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Rewards}          token={token}  to={'/'} />} />
            <Route path="/processpayment"         element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={ProcessPayment}   token={token} title={t('PROCESS PAYMENT')}   to={'/'} />} />
            <Route path="/paymentmethod"          element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={PaymentMethod}   token={token} title={t('PAYMENT METHOD')}   to={-1} />} />
            
            <Route path="/notification"           element={<PrivateRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Notification} token={token}  title={t('NOTIFICATIONS')}                />} />
            <Route path="/notification/directory/:notifId" element={<PrivateRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={NotificationDirectory}  token={token} />} />
            <Route path="/location"               element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Location}         token={token} title="LOCATION" to={-1} />} />
            <Route path="/checkout"               element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Menu'} main={CheckOut}            token={token} title="CHECK OUT"         to={-1} />} />
            <Route path="/rewards"                element={guest === "guest" ? <Navigate to="/dashboard" /> : <PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Rewards}          token={token} title="REWARDS AND DEALS" to={'/'} />} />
            <Route path="/rewards/reward-claim/:uniqueKey"   element={guest === "guest" ? <Navigate to="/dashboard" /> : <PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={RewardsClaim}     token={token} title="REWARDS" to={-1} />} />
            <Route path="/processpayment"         element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={ProcessPayment}   token={token} title="PROCESS PAYMENT" to={'/'} />} />
            
            <Route path="/ar-games"           element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={ARDashboard} token={token}   to={'/'} />} />
            <Route path="/ar-games/ufo"           element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={''} main={UFOGame} token={token} title="UFO Mini Game"   />} />
            <Route path="/ar-games/bowling"           element={<PrivateRoute sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={''} main={BowlingGame} token={token} title="Bowling Mini Game"   />} />


            {/* LEGALITIES */}
            <Route path="/contact"                element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Contact}                title={t('CONTACT US')}               />} />
            <Route path="/privacypolicy"          element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={PrivacyPolicy}          title={t(`PRIVACY POLICY`)}                   />} />
            <Route path="/privacy"                element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={Privacy}                title="PRIVACY"                   />} />
            <Route path="/termsandconditions"     element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={TermsConditions}        title={t(`TERMS AND CONDITIONS`)}      />} />
            <Route path="/accessibility"          element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={AccessibilityStatement} title={t(`ACCESSIBILITY STATEMENT`)}   />} />
            <Route path="/privacyAndManagement"   element={guest === "guest" ? <Navigate to="/dashboard" /> : <PublicRoute  sidebarOpen={false}       setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'}main={PrivacyAccountManagement} title="PRIVACY"                 />} />
            <Route path="/accountdeletion"        element={guest === "guest" ? <Navigate to="/dashboard" /> : <PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={AccountDeletionMessage} title="DELETE ACCOUNT"   />} />
            <Route path="/accountdeletion/accountdeletionfeedback"        element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={AccountDeletionFeedback} title="DELETE ACCOUNT"   />} />
            <Route path="/unlinkSocialMedia"      element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Primary'} main={UnlinkSocialMedia}      title="UNLINK SOCIAL MEDIA"                />} />
            
            

            {/* ERROR ROUTES */}
            <Route path="/error"                  element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Menu'} main={LinkExpired}         title="ERROR" to={'/'} />} />
            <Route path="/error-reset"            element={<PublicRoute  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setHasLoaded={setHasLoaded} refs={refs} layout={'Menu'} main={ResetExpired}        title="ERROR" to={'/'} />} />
            <Route path='*'                       element={<Errors />} />
        </Routes>
    )
};

export default AppRoutes;