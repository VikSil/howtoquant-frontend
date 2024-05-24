import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GreenButton from '../primitives/GreenButton';
import TableContainer from '../containers/TableContainer';
import OrganizationAdd from './subpages/OrganizationAdd';

import { getOrganizations } from '../../utils/api_get';

export default function Funds() {
  const [searchParams] = useSearchParams();
  const [subpage, setSubPage] = useState(searchParams.get('subpage'));

  return (
    <main className='d-flex flex-column flex-fill p-5'>
      <h2>Funds</h2>
      <div className='d-flex justify-content-center spaced-div'>
        <GreenButton
          text={'View All'}
          clickFunction={() => {
            setSubPage('viewFunds');
          }}
        />
        <GreenButton
          text={'New Fund'}
          clickFunction={() => {
            setSubPage('newFund');
          }}
        />
      </div>
      <section className='d-flex justify-content-center top-split mt-4 py-5'>
        {subpage === 'viewFunds' ? (
          <TableContainer
            title={'All Funds'}
            fetchFunction={getOrganizations}
            fetchParams={'Fund'}
            fetchKey={'organizations'}
          />
        ) : subpage === 'newFund' ? (
          <OrganizationAdd orgType='Fund' />
        ) : null}
      </section>
    </main>
  );
}
