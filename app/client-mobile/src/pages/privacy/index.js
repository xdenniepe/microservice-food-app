import React, { useEffect, useState} from 'react'
import { CLASSES } from "../../utility/classes";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronDown } from "../../utility/icons";
import Select, { components } from 'react-select';
import { getLocalStorageItem } from '../../service/helper';




const options = [
  { value: '/unlinkSocialMedia', label: 'Unlink Social Media Accounts' },
  { value: '/accountdeletion', label: 'Delete An Account' },
];


const navigation = [
    
    {
        current: false,
        name   : 'Privacy Policy',
        path   : '/privacypolicy',
       
    },
    {
        current: false,
        name   : 'Account Deletion',
        path   : '/accountdeletion',
        
    }
]
 

const Privacy = (props) => {
    const { setHasLoaded, renderSr, iconclasses} = props;
    const navigate = useNavigate();
    const [ChangePage , setChangePage] = useState();
    const [chevronStatus, setChevronStatus] = useState(false);


    useEffect(() => {
        setHasLoaded(true);
        window.scrollTo(0, 0)
    }, [])



    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            margin: 0, 
            fontSize: '16px',
            fontWeight: 400,
        }),
        control    : () => ({
            fill  : '#A10601',
            border: '1px solid rgb(209 213 219)',
            borderTopRightRadius: '15px',
            borderTopLeftRadius:  '15px',
            borderBottomLeftRadius:     chevronStatus ? '0px' : '12px',
            borderBottomRightRadius:  chevronStatus ? '0px' : '12px',
            fontSize: '18px',
            fontWeight: 550,
            height:75,
            paddingTop: '20px',
            paddingLeft: '7px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        }),
        option     : (provided, state) => ({
            ...provided,
            backgroundColor: 'white',
            color          : '#8D8D8D',
            fill           : '#4b4b4b',  
            borderBottom   : '1px solid rgb(229 231 235)',
            
        }),
        singleValue: (provided) => ({
            ...provided,
             color: '#8D8D8D',
             
    
        }),
    };
    
    

    const Navigate = (options) => {
   
        setChangePage(options.value);

    }   

    if(ChangePage != undefined){
        navigate(ChangePage);
    }

    const handleChevronDown = () => {
        setChevronStatus(true);
    }

    const handleChevronRight = () => {
        setChevronStatus(false);
    }

    const guest = getLocalStorageItem('guestLogin');

    return (
        <div className='mt-8'>
            { renderSr() }
          
            <div className={CLASSES.container}>
                <div className={`${CLASSES.main}`}>
                    <div className="flex flex-col space-y-8 h-96">
                   
                 
                        <div className={`${CLASSES.roundedCard} flex flex-row border border-gray-500 border-opacity-25 py-3 cursor-pointer`} role="button" key='Privacy Policy' onClick={() => {navigate('/privacypolicy')}}>
                            <div className="w-full m-auto text-left">
                                    <div className="flex justify-center items-center h-12">
                                        <h1 className="font-semibold mr-2 flex-1 text-lg text-gray-500 align-middle xss:text-mdss" role="dialog" aria-label='privacyPolicy'>Privacy Policy</h1>
                                       
                                        <ChevronRight className={`text-black group-hover:text-black-500 flex-shrink-0 h-8 xss:h-6 ${iconclasses}`} />
                                        
                                    </div>
                                </div>
                        </div>

                    { guest !== "guest" ?
                        <div className={`relative text-base border-gray-500 tracking-tight`}>
                            <Select
                                components     = {{
                                    DropdownIndicator :() => null, 
                                    IndicatorSeparator:() => null,
                                }}
                                placeholder       = "Help Center"
                                onChange          ={Navigate}
                                onBlur            ={handleChevronRight}
                                options           ={options}
                                styles            ={customStyles}
                                dropdownIndicator ={false}
                                isSearchable      = {false}
                                onMenuClose       ={handleChevronRight}
                                onMenuOpen        ={handleChevronDown}
                            />
                            {
                                chevronStatus === false ?
                                <div class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-700">
                               <ChevronRight className={`text-black group-hover:text-black-500 flex-shrink-0 h-8 xss:h-6 ${iconclasses}`} />
                                </div> 
                                :
                                <div class="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-gray-700">
                               <ChevronDown className={`text-black group-hover:text-black-500 flex-shrink-0 h-8 xss:h-6 ${iconclasses}`} />
                                </div> 
                            }
                                    
                        </div>
                        :
                        ""
                    }         
                                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Privacy

