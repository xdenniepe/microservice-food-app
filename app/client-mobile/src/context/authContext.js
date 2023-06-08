import { createContext, useEffect, useReducer } from "react";
import AuthReducer, { initialState } from "../reducer/authReducer";
import { setLocalStorageItem } from "../service/helper";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, initialState);

	useEffect(() => {
		if (state.token || state.user) {
			setLocalStorageItem('token', state.token);
			setLocalStorageItem('user', state.user);
/*             setLocalStorageItem('vendingMachineId', '2b08e375-275d-473e-910d-32700e34b61a'); */
		} else {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			localStorage.removeItem("vendingMachineId");
			localStorage.removeItem("order");
			localStorage.removeItem("payment");
			localStorage.removeItem("order");
			localStorage.removeItem("invoices");
			localStorage.removeItem("lastOrder");
		}
	}, [state.token]);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{
				children
			}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider;