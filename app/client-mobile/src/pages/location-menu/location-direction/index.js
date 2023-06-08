import { ArrowCircleRightIcon, ArrowNarrowRightIcon, ArrowNarrowUpIcon, ArrowsExpandIcon, ArrowSmRightIcon, ArrowSmUpIcon } from '@heroicons/react/outline';
import React, { useEffect, useRef, useContext } from 'react'
import { LocationContext } from "../../../context/locationContext";
import { IMAGES } from '../../../utility/constants';
import { getLocalStorageItem } from '../../../service/helper';
const LocationDirection = (props) => {
	const { setHasLoaded, renderSr, sidebarOpen, setSidebarOpen } = props;
	const accessbilityRef = useRef(null)
    const locationContext = useContext(LocationContext);
    const vmAddress           = locationContext.state.vmAddress;
    const localStorageMenu = getLocalStorageItem('locationMenu').find((item)=>item.address === vmAddress);

	useEffect(() => {
		setHasLoaded(true);
		window.scrollTo(0, 0)
	}, [])

	return (
		<div>
			{ renderSr() }
			
			<div className='relative'>
            	<img draggable={false} alt="text" src={IMAGES.DEFAULTBUILDING} className="object-cover h-70 w-screen xss:h-auto"  />
          	</div>

			<div className='flex justify-center pt-4'>
				<h1 className='text-xs text-gray-600'>
					Yo-Kai Express Vending Machine
				</h1>
			</div>
			<div className='flex justify-center pt-1'>
				<h1 className='text-md font-bold text-center'>
					{vmAddress}
					{localStorageMenu.status === 'ACT' ?
					<></>
					:
					<span><br/>Coming Soon</span>
				}
				</h1>
			</div>

			<div className='px-10 mt-3 ml-5'>
				<div className="flex flex-row">
					<div className=" w-1/2">
						<h1 className='text-sm text-gray-500'>Sunday</h1>
					</div>
					<div className="w-1/2 ml-7">
						<h1 className='text-sm text-gray-500'>10:00 am to 7:30 pm</h1>
					</div>
				</div>
			</div>
			<div className='px-10 mt-3 ml-5'>
				<div className="flex flex-row">
					<div className=" w-1/2">
						<h1 className='text-sm text-gray-500'>Monday</h1>
					</div>
					<div className="w-1/2 ml-7">
						<h1 className='text-sm text-gray-500'>10:00 am to 7:30 pm</h1>
					</div>
				</div>
			</div>
			<div className='px-10 mt-3 ml-5'>
				<div className="flex flex-row">
					<div className=" w-1/2">
						<h1 className='text-sm text-gray-500'>Tuesday</h1>
					</div>
					<div className="w-1/2 ml-7">
						<h1 className='text-sm text-gray-500'>10:00 am to 7:30 pm</h1>
					</div>
				</div>
			</div>
			<div className='px-10 mt-3 ml-5'>
				<div className="flex flex-row">
					<div className=" w-1/2">
						<h1 className='text-sm text-gray-500'>Wednesday</h1>
					</div>
					<div className="w-1/2 ml-7">
						<h1 className='text-sm text-gray-500'>10:00 am to 7:30 pm</h1>
					</div>
				</div>
			</div>
			<div className='px-10 mt-3 ml-5'>
				<div className="flex flex-row">
					<div className=" w-1/2">
						<h1 className='text-sm text-gray-500'>Thursday</h1>
					</div>
					<div className="w-1/2 ml-7">
						<h1 className='text-sm text-gray-500'>10:00 am to 7:30 pm</h1>
					</div>
				</div>
			</div>
			<div className='px-10 mt-3 ml-5'>
				<div className="flex flex-row">
					<div className=" w-1/2">
						<h1 className='text-sm text-gray-500'>Friday</h1>
					</div>
					<div className="w-1/2 ml-7">
						<h1 className='text-sm text-gray-500'>10:00 am to 7:30 pm</h1>
					</div>
				</div>
			</div>
			<div className='px-10 mt-3 ml-5'>
				<div className="flex flex-row">
					<div className=" w-1/2">
						<h1 className='text-sm text-gray-500'>Saturday</h1>
					</div>
					<div className="w-1/2 ml-7">
						<h1 className='text-sm text-gray-500'>10:00 am to 7:30 pm</h1>
					</div>
				</div>
			</div>
			
			<div className='flex flex-row justify-center pt-5'>
				<h1 className='text-md font-bold text-secondary'>
					Get Directions 
				</h1>
				<ArrowSmUpIcon  className='h-3 w-3 stroke-white ml-2 mt-1.5 transform rotate-45 bg-secondary rounded-sm'/>
			</div>


			<div className='flex justify-center pt-4 px-10'>
				<h1 className='text-sm text-gray-500'>
					1. Once you Enter the Establishment enter the first door to the right.
				</h1>
			</div>
			<div className='flex justify-center pt-4 px-10'>
				<h1 className='text-sm text-gray-500'>
					2. Once you Enter the door to your right go straight then left to see a row of vending machines.
				</h1>
			</div>
			<div className='flex justify-center pt-4 px-10'>
				<h1 className='text-sm text-gray-500'>
					3. You will see the Yo-Kai Machine between the bread vending machine as well as the burger vending machine.
				</h1>
			</div>

			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>

		</div>
	)
}

export default LocationDirection