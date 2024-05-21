import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import GreenButton from '../../primitives/GreenButton';
import GreenTextBox from '../../primitives/GreenTextBox';
import GreenCheckBox from '../../primitives/GreenCheckBox';

import { getGenericRequest, putInstrumentDownload } from '../../../utils/api';
import Loading from '../../stateless/Loading';

export default function InstrumentDownload() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allTickers, setAllTickers] = useState([]);
  const [ticker, setTicker] = useState('');
  const [isExistingTicker, setIsExistingTicker] = useState(false);
  const [instId, setInstId] = useState(null);

  useEffect(() => {
    getGenericRequest('identifierCodes').then((data) => {
      setAllTickers(data.codes);
    });
  }, []);

  const triggerDownload = (event) => {
    setIsExistingTicker(false);
    const newDownload = {
      'ticker': ticker,
      'service': 'polygon.io',
    };
    setError(null);
    setIsLoading(true);
    putInstrumentDownload(newDownload)
      .then((data) => {
        setAllTickers((allTickers) => [...allTickers, ticker]);
        data.status === 'OK'
          ? setInstId(data.data.instrument_id)
          : setError(data.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ticker) {
      if (allTickers.includes(ticker.toUpperCase())) {
        setIsExistingTicker(true);
      } else {
        triggerDownload();
      }
    } else {
      setError('Please fill out ticker field');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <GreenTextBox
            text='Indentifier'
            labelLocation='left'
            id='ticker-input'
            value={ticker}
            onChange={setTicker}
          />
        </fieldset>
        <fieldset className='py-2 pe-2 text-end'>
          <GreenCheckBox
            title='Source'
            text='polygon.io'
            id='source-input'
            disabled={true}
            checked={true}
          />
        </fieldset>
        <fieldset className='text-end pe-2'>
          <GreenButton
            text='Download'
            btntype='submit'
            isDisabled={isLoading}
          />
        </fieldset>
        <fieldset className='text-start'>
          {error && <p className='error-class'>{error}</p>}
          {isLoading && <Loading />}
          {isExistingTicker && (
            <>
              <div className='top-split mt-3 pt-2 pe-2 d-flex justify-content-between'>
                <p className='mb-0 mt-3 align-content-center'>
                  Ticker already exists in the database
                </p>
              </div>
              <div className='pt-2 pe-2 d-flex justify-content-between'>
                <Link
                  className='px0'
                  to={`/equities?subpage=viewTicker&ticker=${ticker}`}
                >
                  <GreenButton text='View Existing' />
                </Link>
                <GreenButton
                  text='New Override'
                  isDisabled={isLoading}
                  clickFunction={triggerDownload}
                />
              </div>
            </>
          )}
          {instId && (
            <div className='top-split mt-3 pt-2 pe-2 d-flex justify-content-between'>
              <p className='mb-0 align-content-center'>Instrument downloaded</p>
              <Link
                className='px0'
                to={`/equities?subpage=viewTicker&ticker=${ticker}`}
              >
                <GreenButton text='View' />
              </Link>
            </div>
          )}
        </fieldset>
      </form>
    </>
  );
}
