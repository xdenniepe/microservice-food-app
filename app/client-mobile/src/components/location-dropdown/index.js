import React, { useContext, useEffect, useState } from "react";
import Select, { components } from "react-select";
import { useLocation } from "react-router-dom";
import { LocationPin, MagnifyingGlass } from "../../utility/icons";
import { LocationContext } from "../../context/locationContext";
import { SET_NEAREST_VM_ADDRESS } from "../../reducer/locationReducer";
import { getLocalStorageItem  } from "../../service/helper";
import { OrderContext } from "../../context/orderContext";
import RemoveAllProduct from "../../components/modal/remove-all-product";
import { useTranslation } from "react-i18next";


const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        margin: 0, 
        borderBottomLeftRadius: '15px',
        borderBottomRightRadius: '15px',
        padding: 5,
        border : '1px solid rgb(229 231 235)',
    }),
    control    : () => ({
        fill  : '#A10601',
        border: '1px solid rgb(209 213 219)',
    }),
    option     : (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#751132' : 'white',
        color          : state.isFocused ? 'white'   : '#8D8D8D',
        fill           : state.isFocused ? 'white'   : '#4b4b4b',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px', 
    }),
    singleValue: (provided) => ({
        ...provided,
        /* color: '#8D8D8D',  */

    }),
};

const Control = ({ children, ...props }) =>  {
    const hasValue   = props.hasValue;
    const menuIsOpen = props.menuIsOpen;

    const menuClasses = [
        'rounded-t-xl border-2 border-gray-400',
        'rounded-xl'
    ];

    const renderMagnifyingGlass = () => (
        <div className="pl-5">
            <MagnifyingGlass className="h-5 w-5"/>
        </div> 
    );

    return (
       <components.Control 
            {...props} 
            className={`bg-white border border-slate-700 flex ${menuIsOpen ? menuClasses[0] : menuClasses[1]}  h-[45px] w-[320px]`}
            >
            <div className={`flex flex-row w-full items-center ${(hasValue && !menuIsOpen) ? 'text-sm  text-gray-200' : ''}`}>
                {renderMagnifyingGlass()}
                {children}
            </div> 
        </components.Control>
)};

const ClearIndicator = ({ children, ...props }) => (
    <div className="h-8 w-8 mr-2 flex justify-center items-center">
        <components.ClearIndicator {...props}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5" fill="#707070">
                <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/>
            </svg> */}
            <h1 className='mr-12 text-red-700 bg-white pl-6 z-10'><u><strong>Change</strong></u></h1>
        </components.ClearIndicator>
    </div>
);

const Menu = ({ children, ...props }) => (
    <components.Menu {...props} className="bg-white rounded-b-lg py-0 my-0 border border-1 border-t-gray-300 border-b-gray-300 border-x-gray-300">
        {children}
    </components.Menu>
);

const MenuList = ({ children, ...props }) => {
    const mutatedProps = props;

    mutatedProps.maxHeight = 200;
 
    return (
        <components.MenuList {...mutatedProps} className="rounded-b-lg">
            {children}
        </components.MenuList>
    );
};

const Option = ({ children, ...props }) => {
    const comingSoon = props.data.status == 'UPCOMING' ? ' | (Coming soon)' : '';
    return (
        <components.Option {...props}>
            <div className="flex flex-row items-center gap-5">
                <LocationPin className="h-[15px] w-[10px] ml-3" />
                <div  className="flex flex-col">
               <h1 className="font-bold"> {props.data.locationName}{comingSoon}  </h1>
               {children} 
               </div>
            </div>
        </components.Option>
    );
};

const LocationDropdown = (props) => {
    const { t } = useTranslation(["location"]);
    const locationContext     = useContext(LocationContext);
    const locationDispatch    = locationContext.dispatch;
    const locationMenu        = locationContext.state.locationMenu;
    const vmAddress           = locationContext.state.vmAddress;
    const vmId                = locationContext.state.vmId;
    const locStore            = getLocalStorageItem("vmIdHolder"); //vmIdHolder
    
    const [isDialogHidden, setIsDialogHidden]       = useState(true);
    const [currentAddress, setCurrentAddress]       = useState({});
    const [options, setOptions]                     = useState([]);
    const [changedVmId, setChangedVmId]             = useState("");
    const [changedVmAddress, setChangedVmAddress]   = useState("");
   
    const location       = useLocation();
    const { selectMenu, 
        checkIfFavoriteExists 
    } = props;
   
    useEffect(() => {
        if (location.pathname === "/locationbased") {
            setCurrentAddress({
                label: "",
                value: ""
            });
        } else {
                setCurrentAddress({
                label: (vmAddress) ? vmAddress : "",
                value: (vmId) ? vmId : ""
            });
        }
    },[]);
    useEffect(() => {
        if(locationMenu) {
            const mappedLocations = locationMenu?.map(x => {
                return {
                    label: x.address  ,
                    address: x.address,
                    value: x.vmId,
                    locationName: x.locationName,
                    status: x.status
                };
            });

            setOptions([...mappedLocations]);
        }
        if(!currentAddress){
            setCurrentAddress(location.value)
        }
    }, [currentAddress]);
   

    const filterLocation = (option, inputValue) => {
        const { data } = option;    
        const label    = data.label.toLowerCase();
        const locationName    = data.locationName.toLowerCase();

        return label.includes(inputValue.toLowerCase()) || locationName.includes(inputValue.toLowerCase());
    };
   
    const handleChange = (location) => {
        setChangedVmId(location.value)
        setChangedVmAddress(location.label)

         if(locStore !== location.value && locStore !== undefined){
            setIsDialogHidden(false);
            
        }else{
            if (!location) {
            setCurrentAddress({
                label: "",
                value: "",
            });

            return;
            }

        setCurrentAddress({
            label: location.label,
            value: location.value,
        });

        locationDispatch({
            type: SET_NEAREST_VM_ADDRESS,
            payload: location.label
        });

        selectMenu(location.value);
        checkIfFavoriteExists();
    }
    };



    return (
        <div className="flex justify-center items-center text-black text-sm px-10 py-5">
            <Select 
                components     = {{
                    Control, 
                    ClearIndicator,
                    DropdownIndicator :() => null, 
                    IndicatorSeparator:() => null,
                    Menu, 
                    MenuList,
                    Option,
                }}
                filterOption   = {filterLocation}
                isClearable    = {true}
                isSearchable   = {true}
                name           = "address"
                onChange       = {handleChange}
                options        = {options} 
                placeholder    = {t("Location Name, City, State, Address")}
                styles         = {customStyles}
                value          = {options.find(option => option.address === currentAddress.label)}
            />
            <div>
                 <RemoveAllProduct 
                    setIsDialogHidden={setIsDialogHidden} 
                    isDialogHidden={isDialogHidden} 
                    changedVmId={changedVmId}
                    setCurrentAddress={setCurrentAddress}
                    changedVmAddress={changedVmAddress}
                />
            </div>
        </div>
    ); 
};

export default LocationDropdown;
