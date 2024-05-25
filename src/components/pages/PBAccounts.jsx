import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GreenButton from '../primitives/GreenButton';
import TableContainer from '../containers/TableContainer';
import GreenForm from '../containers/GreenForm';
import OrganizationAdd from './subpages/OrganizationAdd';

import { getGenericRequest, getOrganizations } from '../../utils/api_get';
import { postPBACcount } from '../../utils/api_post';

export default function PBAccount() {
  const [searchParams] = useSearchParams();
  const [subpage, setSubPage] = useState(searchParams.get('subpage'));

  const [accountName, setAccountName] = useState('');
  const [accountExternalName, setAccountExternalName] = useState('');
  const [brokerOrgName, setBrokerOrgName] = useState('');
  const [brokerOrgId, setBrokerOrgId] = useState('');
  const [fundOrgName, setFundOrgName] = useState('');
  const [fundOrgId, setFundOrgId] = useState('');
  const [isCashAccount, setIsCashAccount] = useState(false);
  const [postResponse, setPostResponse] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const submitAccountData = () => {
    setButtonDisabled(true);
    setPostResponse('');
    const data = {
      'name': accountName,
      'external_name': accountExternalName,
      'cash_account': isCashAccount,
      'broker_name': brokerOrgName,
      'fund_name': fundOrgName,
    };
    postPBACcount(data)
      .then((data) => {
        if (data.status === 'OK') {
          setPostResponse('Saved successfully');
          setAccountName('');
          setAccountExternalName('');
          setBrokerOrgId('');
          setFundOrgId('');
          setIsCashAccount(false);
        } else {
          setPostResponse(data.data);
        }
        setButtonDisabled(false);
      })
      .catch((error) => {
        setPostResponse(error);
      });
  };

  const brokerChangeControler = (id, text) => {
    setBrokerOrgName(text);
    setBrokerOrgId(id);
  };

  const fundChangeControler = (id, text) => {
    setFundOrgName(text);
    setFundOrgId(id);
  };

  const accountData = [
    {
      'type': 'textbox',
      'props': {
        'text': 'Account Name',
        'labelLocation': 'left-apart',
        'id': 'account-name-input',
        'mandatory': true,
        'value': accountName,
        'onChange': setAccountName,
      },
    },
    {
      'type': 'textbox',
      'props': {
        'text': 'External Name',
        'labelLocation': 'left-apart',
        'id': 'external-name-input',
        'value': accountExternalName,
        'onChange': setAccountExternalName,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Prime Broker',
        'labelLocation': 'left-apart',
        'id': 'pb-select',
        'mandatory': true,
        'fetchFunction': getGenericRequest,
        'fetchKey': 'broker_names',
        'fetchParams': 'broker_names',
        'currentValue': brokerOrgId,
        'onChange': brokerChangeControler,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Fund',
        'labelLocation': 'left-apart',
        'id': 'fund-select',
        'mandatory': true,
        'fetchFunction': getGenericRequest,
        'fetchKey': 'fund_names',
        'fetchParams': 'fund_names',
        'currentValue': fundOrgId,
        'onChange': fundChangeControler,
      },
    },
    {
      'type': 'checkbox',
      'props': {
        'text': 'Cash Account',
        'id': 'cash-fund-checkbox',
        'checked': isCashAccount,
      },
    },
    {
      'type': 'button',
      'props': {
        'text': 'Save',
        'id': 'account-save-btn',
        'btntype': 'submit',
        'isDisabled': buttonDisabled,
      },
    },
  ];

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
          <OrganizationAdd orgType='Prime Broker' />
        ) : subpage === 'viewAccounts' ? (
          <TableContainer
            title={'All PB Accounts'}
            fetchFunction={getGenericRequest}
            fetchParams={'pbaccounts'}
            fetchKey={'pbaccounts'}
          />
        ) : subpage === 'newAccount' ? (
          <GreenForm
            formTitle='New Account'
            formList={accountData}
            onSubmit={submitAccountData}
            submitResult={postResponse}
          />
        ) : null}
      </section>
    </main>
  );
}
