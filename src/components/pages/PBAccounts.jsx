import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GreenButton from '../primitives/GreenButton';
import TableContainer from '../containers/TableContainer';
import AccountAdd from './subpages/AccountAdd';
import BrokerAdd from './subpages/BrokerAdd';

import { getGenericRequest, getOrganizations } from '../../utils/api';

export default function PBAccount() {
  const [searchParams] = useSearchParams();
  const [subpage, setSubPage] = useState(searchParams.get('subpage'));

  return (
    <main className='d-flex flex-column flex-fill p-5'>
      <h2>PBs & Accounts</h2>
      <div className='d-flex justify-content-center spaced-div'>
        <GreenButton
          text={'View PBs'}
          clickFunction={() => {
            setSubPage('viewPBs');
          }}
        />
        <GreenButton
          text={'New PB'}
          clickFunction={() => {
            setSubPage('newPB');
          }}
        />
        <GreenButton
          text={'View Accounts'}
          clickFunction={() => {
            setSubPage('viewAccounts');
          }}
        />
        <GreenButton
          text={'New Account'}
          clickFunction={() => {
            setSubPage('newAccount');
          }}
        />
      </div>
      <section className='d-flex justify-content-center top-split mt-4 py-5'>
        {subpage === 'viewPBs' ? (
          <TableContainer
            title={'All Prime Brokers'}
            fetchFunction={getOrganizations}
            fetchParams={'Prime Broker'}
            fetchKey={'organizations'}
          />
        ) : subpage === 'newPB' ? (
          <BrokerAdd />
        ) : subpage === 'viewAccounts' ? (
          <TableContainer
            title={'All PB Accounts'}
            fetchFunction={getGenericRequest}
            fetchParams={'pbaccounts'}
            fetchKey={'pbaccounts'}
          />
        ) : subpage === 'newAccount' ? (
          <AccountAdd />
        ) : null}
      </section>
    </main>
  );
}
