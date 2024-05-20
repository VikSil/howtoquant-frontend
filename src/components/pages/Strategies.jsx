import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GreenButton from '../primitives/GreenButton';
import TableContainer from '../containers/TableContainer';
import StrategyAdd from './subpages/StrategyAdd';

import { getGenericRequest } from '../../utils/api';

export default function Strategies() {
  const [searchParams] = useSearchParams();
  const [subpage, setSubPage] = useState(searchParams.get('subpage'));

  return (
    <main className='d-flex flex-column flex-fill p-5'>
      <h2>Strategies</h2>
      <div className='d-flex justify-content-center spaced-div'>
        <GreenButton
          text={'View All'}
          clickFunction={() => {
            setSubPage('viewStrategies');
          }}
        />
        <GreenButton
          text={'New Strategy'}
          clickFunction={() => {
            setSubPage('newStrategy');
          }}
        />
      </div>
      <section className='d-flex justify-content-center top-split mt-4 py-5'>
        {subpage === 'viewStrategies' ? (
          <TableContainer
            title={'All Strategies'}
            fetchFunction={getGenericRequest}
            fetchParams={'strategies'}
            fetchKey={'strategies'}
          />
        ) : subpage === 'newStrategy' ? (
          <StrategyAdd />
        ) : null}
      </section>
    </main>
  );
}
