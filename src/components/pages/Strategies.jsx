import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GreenButton from '../primitives/GreenButton';
import TableContainer from '../containers/TableContainer';
import GreenForm from '../containers/GreenForm';

import { getGenericRequest } from '../../utils/api_get';
import { postStrategies } from '../../utils/api_post';

export default function Strategies() {
  const [searchParams] = useSearchParams();
  const [subpage, setSubPage] = useState(searchParams.get('subpage'));

  const [strategyName, setStrategyName] = useState('');
  const [strategyDescr, setStrategyDescr] = useState('');
  const [postResponse, setPostResponse] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const submitStrategyData = () => {
    setButtonDisabled(true);
    postStrategies(strategyName, strategyDescr)
    .then((data) => {
      setPostResponse(data.status);
      setButtonDisabled(false);
    })
    .catch((error) => {
      setPostResponse(error);
    });
    
  };

  const strategyData = [
    {
      'type': 'textbox',
      'props': {
        'text': 'Name',
        'labelLocation': 'left-apart',
        'id': 'strategy-name-input',
        'mandatory': true,
        'value': strategyName,
        'onChange': setStrategyName,
      },
    },
    {
      'type': 'textbox',
      'props': {
        'text': 'Description',
        'labelLocation': 'left-apart',
        'id': 'strategy-description-input',
        'value': strategyDescr,
        'onChange': setStrategyDescr,
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
      <h2>Strategies</h2>
      <div className='d-flex justify-content-center spaced-div'>
        <GreenButton
          text={'View All'}
          clickFunction={() => {
            setSubPage('viewStrategies');
            setStrategyName('');
            setStrategyDescr('');
            setPostResponse('');
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
          <GreenForm
            formTitle={'New Strategy'}
            formList={strategyData}
            onSubmit={submitStrategyData}
            submitResult ={postResponse}
          />
        ) : null}
      </section>
    </main>
  );
}
