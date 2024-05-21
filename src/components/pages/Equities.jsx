import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import GreenButton from '../primitives/GreenButton';
import TableContainer from '../containers/TableContainer';
import EquityView from './subpages/EquityView';

import { getGenericRequest } from '../../utils/api';

export default function Equities() {
  const [searchParams] = useSearchParams();
  const [subpage, setSubPage] = useState(searchParams.get('subpage'));

  return (
    <main className='d-flex flex-column flex-fill p-5'>
      <h2>Equities</h2>
      <div className='d-flex justify-content-center spaced-div'>
        <GreenButton
          text={'View All'}
          clickFunction={() => {
            setSubPage('viewEquities');
          }}
        />
        <GreenButton
          text={'View Ticker'}
          clickFunction={() => {
            setSubPage('viewTicker');
          }}
        />
        <Link className='px0' to={`/new instrument?subpage=download`}>
          <GreenButton text={'Download'} />
        </Link>
      </div>
      <section className='d-flex justify-content-center top-split mt-4 py-5'>
        {subpage === 'viewEquities' ? (
          <TableContainer
            title={'All Equities'}
            fetchFunction={getGenericRequest}
            fetchParams={'equities'}
            fetchKey={'equities'}
          />
        ) : subpage === 'viewTicker' ? (
          <EquityView
            labelText={'Ticker'}
            contentTitle={'Instrument details'}
            initTicker={searchParams.get('ticker')}
          />
        ) : null}
      </section>
    </main>
  );
}
