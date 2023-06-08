import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { OrderContext } from "../../../context/orderContext";
import { getSumOfArray, setLocalStorageItem, getLocalStorageItem } from "../../../service/helper";
import { Cart, Product, Person, Receipt, ARCamera } from "../../../utility/icons";

const BottomNavigation = (props) => {
	const { hidden, sidebarOpen, setSidebarOpen, redirectSC, isHidden, setHasLoaded, isDialogHidden } = props;
	const { state } = useContext(OrderContext);
	const navigate = useNavigate();
	const location = useLocation();
	const isOpen2   = getLocalStorageItem('open');
	const [cartHolder, setCartHolder] = useState('');
	let vmIdHolderForNav = getLocalStorageItem('vmId');
	
	const tabs = [
		{
			name: 'Menu',
			rootPath: cartHolder,
			path: ['/dashboard', '/locationbased', '/locationmenu'],
			icon: Product,
			badgeCount: 0,
			arialabel: "Shop Icon - Menu Selection  Page",
			label: "Home"
		},
	
		{
			name: 'Order',
			rootPath: '/order',
			path:['/order','/payment','/orderreview'],
			icon: Cart,
			badgeCount: getSumOfArray(state?.invoices?.map(invoice => invoice.quantity)),
			arialabel: "Cart Icon - Items Are In The Cart ",
			label: "Cart"
		},
	]

	useEffect(() => {	
		if(state.invoices === undefined || state.invoices === null){
			console.log("invoices:null");
		}else{
			if(state.invoices.length <= 0){
				setCartHolder('/dashboard');	
			}else if(state.invoices.length > 0 && vmIdHolderForNav === undefined){
				setCartHolder('/dashboard');
			}else{
				setCartHolder('/locationmenu');
			}
		}	
	});

	const getActivePaths = () => {
		switch (location.pathname) {
			case '/settings':
			case '/contact':
			case '/termsandconditions':
            case '/privacypolicy':
            case '/accessibility':
				return 'text-secondary group-hover:text-secondary'
			default:
				return 'text-black group-hover:text-black'
		}
	}

	const handleClick = () => {
		setSidebarOpen(true);
		redirectSC();
		setLocalStorageItem('openpath', location.pathname)
	}

	const classNames = (...classes) => {
		return classes.filter(Boolean).join(' ');
	}

	return (
		<div className="fixed shadow-2xl shadow-black w-full bottom-0 border-t border-gray-50 bg-white z-10" hidden={hidden} aria-hidden={isOpen2 === true || isDialogHidden === false ? true : isHidden}>
			<nav className="pb-2 pt-2 flex justify-evenly align-items-center" aria-label="tabs">
				{
					tabs.map((tab) => (
						<button
							key={tab.name}
							className={`relative mt-2 w-1/5 inline-block flex flex-col items-center justify-center cursor-pointer
							${classNames(
									(tab.path.includes(location.pathname)) ?
									'text-secondary'
									:
										'text-black hover:text-secondary hover:border-gray-50',
									'group inline-flex items-center py-4 px-1 font-medium text-sm'
							)}`
							}
							aria-current={tab.current ? 'page' : undefined}
							role="button"
							aria-label={ tab.arialabel }
							onClick={() => {
								navigate(tab.rootPath);
								redirectSC();
							}}
						>
							<div className="flex flex-col justify-center items-center absolute">
							<tab.icon
								fill={'none'}
								stroke={(tab.path.includes(location.pathname)) ? '#751132' : 'black'}
								className={`flex align-content-center stroke-0 primary-icon ${classNames(
									(tab.path.includes(location.pathname)) ?
										'text-secondary'
									:
										'text-black group-hover:text-black',
									'h-8 w-8'
								    )}
								`}
								aria-hidden="true"
								
							/>
							<p className="text-xxs">{tab.label}</p>
							</div>
							{
								tab.badgeCount > 0 &&
								<span className="absolute top-4 right-5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{tab.badgeCount}</span>
							}
						</button>
						
					))
				}
				<div className="relative mb-4 w-1/4 inline-block flex flex-col items-center justify-center cursor-pointer">
					<button className={`absolute rounded-full w-full h-28 bg-white`}
					onClick={() => {
						navigate('/ar-games');
						redirectSC();
					}}
					arialabel = "Camera Icon - Augmented Reality Page"
					>
						<div className="flex flex-col justify-center items-center">
							<ARCamera aria-hidden="true" fill={'none'} stroke={(location.pathname === '/arlocation') ? '#751132' : 'black'} className={`pb-1 flex align-content-center primary-icon ${classNames(
									(location.pathname === '/arlocation') ?
										'text-secondary'
									:
										'text-black group-hover:text-black',
									'h-14 w-14'
								    )}`}/>
							<p className={`text-xxs ${location.pathname === '/arlocation' ? 'text-secondary' : 'text-black group-hover:text-black'}`}>AR Mode</p>
						</div>
					</button>
				</div>
				<button className={`relative mt-2 w-1/5 inline-block flex flex-col items-center justify-center cursor-pointer`}
				onClick={() => {
					navigate('/purchasehistory');
					redirectSC();
				}}
				arialabel = "Receipt Icon - Review Processed Order(s)"
				
				>
					<div className="flex flex-col justify-center items-center">
							<Receipt aria-hidden="true" fill={'none'} stroke={(location.pathname === '/purchasehistory') ? '#751132' : 'black'} className={`flex align-content-center stroke-0 primary-icon text-black group-hover:text-black ${classNames(
									(location.pathname === '/purchasehistory') ?
										'text-secondary'
									:
										'text-black group-hover:text-black',
									'h-8 w-8'
								    )}`}/>
							<p className={`text-xxs ${location.pathname === '/purchasehistory' ? 'text-secondary' : 'text-black group-hover:text-black'}`}>History</p>
					</div>
				</button>
				<button className={`inline-block mt-3 grow items-center justify-center cursor-pointer group inline-flex items-center font-medium text-sm`}
					id="show-sidebar" type="button" role="switch" aria-pressed="false" onClick={handleClick} hidden={isHidden}
				>
					<p aria-live="polite" className="sr-only">{sidebarOpen ? 'Open sidebar' : ''}</p>
					<div className="flex flex-col justify-center items-center">
							<Person fill={'none'} className={`h-7 w-7 flex align-content-center stroke-0 primary-icon text-black group-hover:text-black ${getActivePaths()}`} aria-hidden="false" role="link" aria-label="Avatar Icon - User Profile"/>
							<p className="text-xxs">Settings</p>
					</div>
				</button>
			</nav>
		</div>
	)
}

export default BottomNavigation;