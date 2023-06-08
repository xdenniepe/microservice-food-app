import React from "react";

// LS-COMMENT: This is a test skeleton for your loading state. Please follow the directory /skeleton/index.js 
const Skeleton = () => {
    const ROWS_PER_POSTS = 4;
    
	return (

		<div className="min-h-full flex flex-col justify-center py-6 sm:px-6 overflow-x-hidden overscroll-x-none pt-8">
            {
                [...Array(ROWS_PER_POSTS)].map((_, index) => 
                    <div key={`skpost_${index}`} className="w-full h-full py-3">
                        <div className='animate-pulse'>
                            <div className='mt-1 w-11/12 h-28 bg-gray-300 ml-3 rounded-2xl'/>
                        </div>
                    </div>
                )
            }
		</div>

	)
}

export default Skeleton;