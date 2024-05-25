import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GreenButton from '../primitives/GreenButton';
import TableContainer from '../containers/TableContainer';
import GreenForm from '../containers/GreenForm';

import { getGenericRequest, getPBAccountNames } from '../../utils/api_get';
import { postBooks } from '../../utils/api_post';

export default function Books() {
  const [searchParams] = useSearchParams();
  const [subpage, setSubPage] = useState(searchParams.get('subpage'));

  const [bookName, setBookName] = useState('');
  const [bookExternalName, setBookExternalName] = useState('');
  const [accountingMethodName, setAccountingMethodName] = useState('');
  const [accountingMethodId, setAccountingMethodId] = useState('');
  const [ccyName, setCcyName] = useState('');
  const [ccyId, setCcyId] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountId, setAccountId] = useState('');
  const [fundOrgName, setFundOrgName] = useState('');
  const [fundOrgId, setFundOrgId] = useState('');
  const [postResponse, setPostResponse] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const submitBookData = () => {
    setButtonDisabled(true);
    setPostResponse('');
    const data = {
      'name': bookName,
      'external_name': bookExternalName,
      'acct_method': accountingMethodName,
      'base_ccy': ccyName,
      'fund_name': fundOrgName,
      'default_account': accountName,
    };
    postBooks(data)
      .then((data) => {
        if (data.status === 'OK') {
          setPostResponse('Saved successfully');
          setBookName('');
          setBookExternalName('');
          setAccountingMethodId('');
          setCcyId('');
          setAccountId('');
          setFundOrgId('');
        } else {
          setPostResponse(data.data);
        }
        setButtonDisabled(false);
      })
      .catch((error) => {
        setPostResponse(error);
      });
  };

  const accountingMethodChangeControler = (id, text) => {
    setAccountingMethodName(text);
    setAccountingMethodId(id);
  };

  const ccyChangeControler = (id, text) => {
    setCcyName(text);
    setCcyId(id);
  };

  const accountChangeControler = (id, text) => {
    setAccountName(text);
    setAccountId(id);
  };

  const fundChangeControler = (id, text) => {
    setFundOrgName(text);
    setFundOrgId(id);
  };

  const bookData = [
    {
      'type': 'textbox',
      'props': {
        'text': 'Book Name',
        'labelLocation': 'left-apart',
        'id': 'book-name-input',
        'mandatory': true,
        'value': bookName,
        'onChange': setBookName,
      },
    },
    {
      'type': 'textbox',
      'props': {
        'text': 'External Name',
        'labelLocation': 'left-apart',
        'id': 'external-name-input',
        'value': bookExternalName,
        'onChange': setBookExternalName,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Accounting Method',
        'labelLocation': 'left-apart',
        'id': 'acc-method-select',
        'mandatory': true,
        'fetchFunction': getGenericRequest,
        'fetchKey': 'method_names',
        'fetchParams': 'accounting_method_names',
        'currentValue': accountingMethodId,
        'onChange': accountingMethodChangeControler,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Base Currency',
        'labelLocation': 'left-apart',
        'id': 'ccy-select',
        'mandatory': true,
        'fetchFunction': getGenericRequest,
        'fetchKey': 'ccy_codes',
        'fetchParams': 'ccy_codes',
        'currentValue': ccyId,
        'onChange': ccyChangeControler,
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
      'type': 'select',
      'props': {
        'text': 'Account',
        'labelLocation': 'left-apart',
        'id': 'account-select',
        'mandatory': true,
        'fetchFunction': getPBAccountNames,
        'fetchKey': 'account_names',
        'fetchParams': fundOrgName,
        'currentValue': accountId,
        'onChange': accountChangeControler,
      },
    },
    {
      'type': 'button',
      'props': {
        'text': 'Save',
        'id': 'book-save-btn',
        'btntype': 'submit',
        'isDisabled': buttonDisabled,
      },
    },
  ];

  return (
    <main className='d-flex flex-column flex-fill p-5'>
      <h2>Books</h2>
      <div className='d-flex justify-content-center spaced-div'>
        <GreenButton
          text={'View All'}
          clickFunction={() => {
            setSubPage('viewBooks');
          }}
        />
        <GreenButton
          text={'New Book'}
          clickFunction={() => {
            setSubPage('newBook');
          }}
        />
      </div>
      <section className='d-flex justify-content-center top-split mt-4 py-5'>
        {subpage === 'viewBooks' ? (
          <TableContainer
            title={'All Books'}
            fetchFunction={getGenericRequest}
            fetchParams={'books'}
            fetchKey={'books'}
          />
        ) : subpage === 'newBook' ? (
          <GreenForm
            formTitle='New Book'
            formList={bookData}
            onSubmit={submitBookData}
            submitResult={postResponse}
          />
        ) : null}
      </section>
    </main>
  );
}
