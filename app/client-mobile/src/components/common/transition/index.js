import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';



const TransitionComponent = ({ show = false, children }) => {
  return (
    <Transition
      as={Fragment}
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );  
};

export default TransitionComponent;