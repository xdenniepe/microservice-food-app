import React, { useContext, useEffect, useState, useRef } from "react";
import { SHOW_MODAL } from "../../reducer/productReducer";
import { CLASSES } from "../../utility/classes";
import { IMAGES, POST, DELETE, GET} from "../../utility/constants";
import { getLocalStorageItem, shuffleArray } from "../../service/helper";
import { ProductContext } from "../../context/productContext";
import { LocationContext } from "../../context/locationContext";
import { useNavigate } from "react-router-dom";
import LocationDropdown from "../../components/location-dropdown";
import { SET_NEAREST_VM_ID } from "../../reducer/locationReducer";
import MenuCarousel from "../../components/location-menu";
import "react-multi-carousel/lib/styles.css";
import { AuthContext } from "../../context/authContext";
import { request } from "../../service/request";
import api from "../../service/api";
import { HeartIcon } from "@heroicons/react/outline";
import { AddToFavoritesModal } from "../../components/modal";

const LocationMenu = (props) => {

    const { setHasLoaded, renderSr, setSidebarOpen, toast} = props;
   /*  const { state, dispatch }                       = useContext(ProductContext); */
   /*  const [products, setProducts]                   = useState(); */
    /* let vendingMachineId                            = getLocalStorageItem('vendingMachineId'); */
    const { user }                             = useContext(AuthContext)?.state;
    const userId = user.userId;
    const navigate = useNavigate();
    const locationContext = useContext(LocationContext);
    const locationDispatch = locationContext.dispatch;
    const getNearestVm = locationContext.getNearestVm;
    let nearestVmId = locationContext.state.vmId;
    const vmAddress           = locationContext.state.vmAddress;
    const productContext = useContext(ProductContext);
    const productStates = productContext.state;
    const productDispatch = productContext.dispatch;
    const products = productStates.products;
    const status = locationContext.status;
    const [fill, setFill ] = useState('fill-none');
    const [modalText1, setModalText1] = useState('');
    const [modalText2, setModalText2] = useState('');
    const [isDialogHidden, setIsDialogHidden] = useState(true);
    const localStorageMenu = getLocalStorageItem('locationMenu').find((item)=>item.address === vmAddress)
    useEffect(() => {
        if (getLocalStorageItem('firstload')) {
            setSidebarOpen(false)
            localStorage.removeItem('firstload')
        }
        window.scroll(0,0)
        setHasLoaded(true);
        
        
    }, []);

    useEffect(() => {
      if (getLocalStorageItem("guestLogin")) {
        setSidebarOpen(false);
      }
    }, []);

    useEffect(() => {
        if (!nearestVmId) {
          productDispatch({
            type: SHOW_MODAL,
            payload: true,
          });
    
          /* setShowLocationModal(true); */
    
           /* if (products.length === 0) { */
            getNearestVm();
         /*  }  */
          
          console.log("Products", products)
        }
        checkIfFavoriteExists();
    }, []);

    useEffect(() => {
        nearestVmId = getLocalStorageItem("vmId");
    },[])

    useEffect(() => {
        checkIfFavoriteExists();
    }, [vmAddress, fill]);

    useEffect(() => {
    emptyToaster();
    }, [status]);
  

    const selectProduct = (product) => {
        const productId  = product.productId;
        navigate(`/menu/product/${productId}`);
    }

    const selectMenu = (vmId) => {
        locationDispatch({
            type: SET_NEAREST_VM_ID,
            payload: vmId,
        });
    };


    const emptyToaster =() => {
        if (status == 500) {
            { toast('Error', 'Sorry but this machine is empty')}
        }
    }


    const checkIfFavoriteExists = () => {
        request({
            url: api.CHECKFAVORITES+userId + '/' + nearestVmId,
            method: GET,
        }).then(response => {
            
            if(response.data == null){
                setFill('fill-none');
                setModalText1('Would you like to add this location to your favorite list?');
                setModalText2('Add To Favorites');
            }
            else if (response.data != null){
                setFill('fill-secondary');
                setModalText1('Would you like to remove this location to your favorite list?');
                setModalText2('Remove To Favorites');

            }
        })
        .catch((er) => {
            setFill('fill-none');
            setModalText1('Would you like to add this location to your favorite list?');
            setModalText2('Add To Favorites');
        })
    }
    const clickHeart = (e) =>{
        e.stopPropagation();
        showConfirmationDialog();  
    }
  
    const showConfirmationDialog = () => {
        setIsDialogHidden(false);
    }

    const hideConfirmationDialog = () => {
        setIsDialogHidden(true);
    }


    const addToFavorites =()=>{

        console.log('data to add favorites:',  {
            userId: userId,
            vendingMachineId : nearestVmId,
            locationName: vmAddress
        } );

        console.log('fill:',fill);
        if(fill == 'fill-secondary'){
            setFill('fill-none');
            { toast('Success', 'Location has been remove to your favorite list.')};
            request({
                url: api.DELETEFAVORITES + nearestVmId,
                method: DELETE,
            })
        }
        else if (fill == 'fill-none'){
        
            setFill('fill-secondary');
            { toast('Success', 'Location has been added to your favorite list.')};

            request({
            url: api.ADDFAVORITES,
            method: POST,
            data:
            {
                userId: userId,
                vendingMachineId : nearestVmId,
                locationName: vmAddress
            }
            })
        }

        hideConfirmationDialog();
    }

    return (
        <div className={`${CLASSES.container} overflow-x-hidden`}>
            { renderSr() }
            <div className="z-20 w-full">
                <LocationDropdown 
                    selectMenu={selectMenu} 
                    checkIfFavoriteExists={checkIfFavoriteExists} 
                />
            </div>
            <div>
                <div className="-z-0">
                    <MenuCarousel deviceType="mobile" />
                </div>
                <div className="" role="button" onClick={clickHeart}>
                    <HeartIcon className={`absolute h-12 w-12 pb-4 pr-2 z-1 rounded-lg stroke-1 ${fill} text-white left-[88%] top-[170px]`} aria-hidden="false"  />
                </div>
            </div>
            {localStorageMenu?.status == 'ACT' ?
            <div className="flex flex-col space-y-8 mt-6 mx-4">
                {
                    status == (200) ? 
                    products?.map((product, index) => {

                        return (
                            <div className={`${CLASSES.roundedCard} flex flex-row border border-gray-500 border-opacity-5 py-3 cursor-pointer`} role="button" key={`menu_item_${index}`} onClick={() => selectProduct(product)}>
                                <div className="pb-1">
                                    <img className="object-cover w-28 h-24 rounded-xl" src={IMAGES.MENU[product.name]} alt={product.name} aria-label="Ramen in a bowl" />
                                </div>
                                <div className="w-3/4 m-auto pl-2 pb-2 mb-2 flex flex-row">
                                    <div className="flex-col flex-grow w-full">
                                        <p className="font-bold text-base text-secondary mr-2 w-10/12 xss:text-mdss" role="dialog" aria-label={product.name}>{product.name}</p>
                                        <p className="font-light text-sm tracking-tight xss:text-mdss" role="dialog" aria-label={product.description}>{'('}{product.description}{')'}</p>
                                        <p className="font-bold text-base text-secondary object-right xss:text-mdss" role="dialog" aria-label={`${Number(product.price).toFixed(2)} USD`}>{`${Number(product.price).toFixed(2)} USD`}</p>
                                    </div>
                                </div>
                            </div>
                        )
                        })
                        :
                        
                        
                    <div className={`${CLASSES.roundedCard}  flex flex-row border border-gray-500 border-opacity-5 py-3 cursor-pointer`}>
                        
                        <div className="w-3/4 m-auto pl-2 pb-2 mb-2">
                            <div className="flex-col flex-grow w-full">
                                <p className="font-bold text-base text-secondary mr-2 w-10/12 xss:text-mdss" role="dialog">No available Product </p>
                                <p className="font-light text-sm tracking-tight xss:text-mdss" role="dialog" >No available product</p>
                                <p className="font-bold text-base text-secondary object-right xss:text-mdss" role="dialog">{`0 USD`}</p>
                            </div>
                        </div>
                         
                    </div>
                       
                   
                }
              </div>
              :
              <div className="px-5 mt-5 flex justify-center">
                <h1 className="text-3xl font-bold text-center">THIS MACHINE IS COMING SOON PLEASE TRY AGAIN LATER</h1>

              </div>
            }
               
              <AddToFavoritesModal isDialogHidden={isDialogHidden} modalText2={modalText2} modalText1={modalText1} addToFavorites={addToFavorites}  hideConfirmationDialog={hideConfirmationDialog}/>

        </div>
    )
};

export default LocationMenu;
