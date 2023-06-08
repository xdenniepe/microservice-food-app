import React, { useEffect, useRef, useState, useContext} from 'react'
import { CLASSES } from "../../utility/classes";
import { ChevronRight, ChevronDown } from "../../utility/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/authContext";
import { request } from "../../service/request";
import { GET , IMAGES} from "../../utility/constants";
import api from "../../service/api";
import { HIDE_MODAL } from "../../reducer/productReducer";
import { ProductContext } from "../../context/productContext";
import { SET_NEAREST_VM_ID, SET_NEAREST_VM_ADDRESS } from "../../reducer/locationReducer";
import { LocationContext } from "../../context/locationContext";

const Favorites = (props) => {
	const { t } = useTranslation(["accessibility"]);
    const { setHasLoaded, renderSr, iconclasses} = props;
	const accessbilityRef = useRef(null)
    const { user }                             = useContext(AuthContext)?.state;
    const navigate = useNavigate();
    const [ favorites, setfavorites ]   = useState([]);
    const userId = user.userId;
    const productContext  = useContext(ProductContext);
    const productDispatch = productContext.dispatch;
    
    const locationContext  = useContext(LocationContext);
    const locationDispatch = locationContext.dispatch;
    const userLocation     = locationContext.state.userLocation;


	useEffect(() => {
		setHasLoaded(true);
        getFavorites();
		window.scrollTo(0, 0)
	}, [])


    const getFavorites = () => {
        request({
            url: api.FAVORITES+userId,
            method: GET,
        }).then(response => {
            setfavorites(response.data);
            setVmId(response.data.vendingMachineId);
        })
    }

    const selectMenu = (vendingMachineId) => { 
        productDispatch({
            type    : HIDE_MODAL,
            payload : false
        });
        
        locationDispatch({
            type: SET_NEAREST_VM_ID,
            payload: vendingMachineId
        })

        navigate("/locationmenu"); 
        
    };

	return (
		<div>
			{ renderSr() }
			<div className={CLASSES.container}>
                <div className={`${CLASSES.main}`}>

                {
                    favorites != '' ? 
                    favorites.map(({vendingMachineId, locationName}) => (
                    <div className="flex flex-col space-y-8 h-32">
                        <div className={`${CLASSES.roundedCard}  border border-gray-500 border-opacity-25 py-3 cursor-pointer`} role="button" key={`${vendingMachineId}`} onClick={() => {selectMenu(vendingMachineId)}}>
                                
                                <div className="w-full m-auto text-left ml-2">
                                    <div className="flex items-center h-12">
                                        <h1 className="font-bold mr-2  text-lg text-gray-500  xss:text-mdss" role="dialog" aria-label='privacyPolicy'>{locationName}</h1>
                                        <ChevronRight className={`text-black group-hover:text-black-500 flex-shrink-0 h-8 xss:h-6 ${iconclasses}`} />
                                        
                                    </div>
                                    <div className="flex items-center ">
                                        <h1 className=" mr-2 mt-2  text-left text-lg text-gray-500  xss:text-mdss" role="dialog" aria-label='privacyPolicy'>10 miles </h1>          
                                    </div>
                                </div>
                        </div>
                    </div>
                    
                    ))
                    :
                    <div className={CLASSES.container}>
                    <div className={CLASSES.main}>
                            <p className="text-secondary text-center text-xl font-bold my-5 xss:text-mds xss:my-3" aria-label="Whoops">{t('Whoops!')}</p>
                            <img src={IMAGES.FAVE_EMPTY} className="h-full xss:w-3/5" alt="No receipts yet." role="img" aria-label="Astronaut Icon - Illustration Of A Astronaut Holding A Ramen Bowl " />
                            <p className="text-center my-8 text-gray-600 xss:text-mds" aria-label="No FAVORITES YET">Looks like you haven't added anything in favorites yet.</p> 
                   
                    </div>
                    </div>
                    }

                </div>
            </div>
		</div>
	)
}

export default Favorites