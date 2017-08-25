import React      from 'react';
import Accordion  from './components/Accordion';
import AddressMap from './components/AddressMap';

export const Root = () => {
  return (
    <div className='container-fluid'>
      <div className='row' style={{height: window.innerHeight + 'px'}}>
        <div className='col-md-5 col-sm-12'>
          <Accordion />
        </div>
        <div className='col-md-7 col-sm-12'>
          <AddressMap />
        </div>
      </div>
    </div>
  );
};
