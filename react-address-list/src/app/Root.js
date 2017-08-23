import React         from 'react';
import { Accordion } from './components/Accordion';
import { Map       } from './components/Map';

export const Root = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <Accordion />
        </div>
        <div className='col-md-6 col-sm-12'>
          <Map />
        </div>
      </div>
    </div>
  );
};
