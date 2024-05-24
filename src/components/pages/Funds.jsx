import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GreenButton from '../primitives/GreenButton';
import TableContainer from '../containers/TableContainer';
import GreenForm from '../containers/GreenForm';

import { getOrganizations, getGenericRequest } from '../../utils/api_get';
import { postOrganizations } from '../../utils/api_post';

export default function Funds() {
  const [searchParams] = useSearchParams();
  const [subpage, setSubPage] = useState(searchParams.get('subpage'));

  const [fundShortName, setFundShortName] = useState('');
  const [fundLongName, setFundLongName] = useState('');
  const [fundDescr, setFundDescr] = useState('');
  const [fundOwnerName, setFundOwnerName] = useState('');
  const [fundOwnerId, setFundOwnerId] = useState('');
  const [postResponse, setPostResponse] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const submitFundData = () => {
    setButtonDisabled(true);
    setPostResponse('');
    const data = {
      "org_type": "Fund",
      "name": fundShortName,
      "long_name":fundLongName,
      "description":fundDescr,
      "owner_org": fundOwnerName
    };
    postOrganizations(data)
    .then((data) => {
      if (data.status === 'OK'){
          setPostResponse('Saved successfully');
          setFundShortName('');
          setFundLongName('');
          setFundDescr('');
          setFundOwnerId('');
      }
      else {
        setPostResponse(data.data);
      }
      setButtonDisabled(false);
    })
    .catch((error) => {
      setPostResponse(error);
    });
  };

  const ChangeControler = (id, text) =>{
    setFundOwnerName(text);
    setFundOwnerId(id);
  }

  const fundData = [
    {
      'type': 'textbox',
      'props': {
        'text': 'Short Name',
        'labelLocation': 'left-apart',
        'id': 'fund-short-name-input',
        'mandatory': true,
        'value': fundShortName,
        'onChange': setFundShortName,
      },
    },
    {
      'type': 'textbox',
      'props': {
        'text': 'Long Name',
        'labelLocation': 'left-apart',
        'id': 'fund-long-name-input',
        'value': fundLongName,
        'onChange': setFundLongName,
      },
    },
    {
      'type': 'textbox',
      'props': {
        'text': 'Description',
        'labelLocation': 'left-apart',
        'id': 'fund-description-input',
        'value': fundDescr,
        'onChange': setFundDescr,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Parent Fund',
        'labelLocation': 'left-apart',
        'id': 'fund-parent-select',
        'fetchFunction':getGenericRequest,
        'fetchKey': 'fund_names',
        'fetchParams':'fund_names',
        'currentValue': fundOwnerId,
        'onChange': ChangeControler,
      },
    },
    {
      'type': 'button',
      'props': {
        'text': 'Save',
        'id': 'strategy-save-btn',
        'btntype': 'submit',
        'isDisabled': buttonDisabled,
      },
    },
  ];
  
  
  
  
  return (
    <main className='d-flex flex-column flex-fill p-5'>
      <h2>Funds</h2>
      <div className='d-flex justify-content-center spaced-div'>
        <GreenButton
          text={'View All'}
          clickFunction={() => {
            setSubPage('viewFunds');
            setFundShortName('');
            setFundLongName('');
            setFundDescr('');
            setFundOwnerName('');
            setPostResponse('');
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
          <GreenForm
          formTitle={'New Fund'}
          formList={fundData}
          onSubmit={submitFundData}
          submitResult ={postResponse}
        />
        ) : null}
      </section>
    </main>
  );
}
