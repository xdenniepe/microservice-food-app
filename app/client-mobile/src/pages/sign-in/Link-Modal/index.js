import React from 'react'

const LinkModal = (props) => {
    const { show, handleClose, handleLink } = props;
  return (
     <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true" hidden={show}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div  className="fixed z-10 inset-0  overflow-y-auto">
                <div className="flex sm:items-center justify-center items-center h-full p-4 text-center sm:p-0 ">
                <div className="relative bg-white rounded-lg text-left mb-36 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        {/* <div className="flex justify-center items-center py-4 w-24">
                           <img src={IMAGES.FACEBOOK_LOGO}/>
                        </div> */}
                        <h3 className="mt-3 text-lg leading-6 font-extrabold text-secondary" id="modal-title">EMAIL ALREADY EXISTS</h3>
                        <div className="mt-3">
                            <p className="text-sm text-gray-500"> Do you want to link your email into that account? </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-white px-4 py-5 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="button" className="mt-5 w-full inline-flex justify-center rounded-full border border-gray-500 shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleLink}>Link</button>
                    <button type="button" className="mt-5 w-full inline-flex justify-center rounded-full border border-gray-500 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleClose}>Cancel</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
  )
}

export default LinkModal