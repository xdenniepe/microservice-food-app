import { createContext, useContext, useEffect, useReducer } from "react";
import OrderReducer, { CREATE_ORDER, initialState, UPDATE_INVOICES } from "../reducer/orderReducer";
import api from "../service/api";
import { setLocalStorageItem } from "../service/helper";
import { request } from "../service/request";
import { GET, POST } from "../utility/constants";
import { AuthContext } from "./authContext";

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(OrderReducer, initialState);
	const { user } = useContext(AuthContext)?.state;

    useEffect(() => {
        getCurrentOrder();
    }, [])

	useEffect(() => {
		if (state.order) {
			setLocalStorageItem('order', state.order);
		} else {
			getCurrentOrder();
		}
	}, [state.order]);

	useEffect(() => {
		if (state.invoices) {
			setLocalStorageItem('invoices', state.invoices);
		}
	}, [state.invoices]);

	const addOrder = () => {
		request({
			url		: api.ORDERS,
			method	: POST,
			data	: {
				userId: user.userId,
                status: 'PENDING',
			}
		}).then(() => {

			getCurrentOrder();
		}).catch(error => {
			console.log('error : ', error);
		});
	}

	const getCurrentOrder = () => {
		// if (state.order) {
        //     return
		// }

		request({
			url			: `${api.ORDERS}/search/findByUserId`,
			method	: GET,
			params 	: {
				projection  : 'withId',
				userId		: user.userId
			}
		}).then(response => {
			dispatch({
				type 	: CREATE_ORDER,
				payload : response.data
			});
			getInvoices(response.data.orderId);
		}).catch(error => {
			console.log('error : ', error);

			if (error.response.status === 404) {
				addOrder();
			}
		});
	}

	const getInvoices = () => {
		request({
            url     : api.CART_ITEMS,
            method  : GET,
            params  : {
				userId: user.userId,
            }
		}).then(response => {
            console.log(`${response.config.method.toUpperCase()} ${response.config.url}`, response);

			dispatch({
				type 	: UPDATE_INVOICES,
				payload : response.data
			});
		}).catch(error => {
            const { response } = error;
            console.log(`${response.config.method.toUpperCase()} ${response.config.url}`, response);
		});
	}

	return (
		<OrderContext.Provider value={{ state, dispatch, getCurrentOrder }}>
			{
				children
			}
		</OrderContext.Provider>
	)
}

export default OrderContextProvider;