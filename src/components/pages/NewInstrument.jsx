import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import GreenButton from '../primitives/GreenButton';
import InstrumentDownload from './subpages/InstrumentDownload';
import GreenForm from '../containers/GreenForm';

import { getGenericRequest } from '../../utils/api_get';
import { postInstruments } from '../../utils/api_post';

export default function NewInstrument() {
  const [searchParams] = useSearchParams();
  const [subpage, setSubPage] = useState(searchParams.get('subpage'));

  const [name, setName] = useState('');
  const [longName, setLongName] = useState('');
  const [isNewIssuer, setIsNewIssuer] = useState(true);
  const [issuerName, setIssuerName] = useState('');
  const [issuerId, setIssuerId] = useState('');
  const [instClassName, setInstClassName] = useState('Common Stock');
  const [instClassId, setInstClassId] = useState('common-stock');
  const [domicileName, setDomicileName] = useState('USA');
  const [domicileId, setDomicileId] = useState('usa');
  const [ccyName, setCcyName] = useState('USD');
  const [ccyId, setCcyId] = useState('usd');
  // const [sectorName, setSectorName] = useState('');
  // const [sectorId, setSectorId] = useState('');
  // const [subSectorName, setSubSectorName] = useState('');
  // const [subSectorId, setSubSectorId] = useState('');
  const [ticker, setTicker] = useState('');
  const [tickerTypeName, setTickerTypeName] = useState('');
  const [tickerTypeId, setTickerTypeId] = useState('');
  const [postResponse, setPostResponse] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const submitInstrumentData = () => {
    setButtonDisabled(true);
    setPostResponse('');
    const data = {
      'name': name,
      'long_name': longName,
      'class_name': instClassName,
      'domicile': domicileName,
      'ccy': ccyName,
      'issuer_name': issuerName,
      'ticker': ticker,
      'ticker_type': tickerTypeName,
    };
    postInstruments(data)
      .then((data) => {
        if (data.status === 'OK') {
          setPostResponse('Saved successfully');
          setName('');
          setLongName('');
          setIssuerId('');
          setInstClassId('common-stock');
          setDomicileId('usa');
          setCcyId('usd');
          setTicker('');
          setTickerTypeId('');
        } else {
          setPostResponse(data.data);
        }
        setButtonDisabled(false);
      })
      .catch((error) => {
        setPostResponse(error);
      });
  };

  const issuerChangeControler = (id, text) => {
    setIssuerName(text);
    setIssuerId(id);
  };

  const instClassChangeControler = (id, text) => {
    setInstClassName(text);
    setInstClassId(id);
  };

  const domicileChangeControler = (id, text) => {
    setDomicileName(text);
    setDomicileId(id);
  };

  const ccyChangeControler = (id, text) => {
    setCcyName(text);
    setCcyId(id);
  };

  // const sectorChangeControler = (id, text) => {
  //   setSectorName(text);
  //   setSectorId(id);
  // };

  // const subSectorChangeControler = (id, text) => {
  //   setSubSectorName(text);
  //   setSubSectorId(id);
  // };

  const tickerTypeChangeControler = (id, text) => {
    setTickerTypeName(text);
    setTickerTypeId(id);
  };

  const issuerData = [
    {
      'type': 'select',
      'props': {
        'text': 'Issuer',
        'labelLocation': 'left-apart',
        'id': 'issuer-select',
        'mandatory': true,
        'fetchFunction': getGenericRequest,
        'fetchKey': 'issuer_names',
        'fetchParams': 'issuer_names',
        'currentValue': issuerId,
        'onChange': issuerChangeControler,
      },
    },
  ];

  const newIssuerData = [
    {
      'type': 'textbox',
      'props': {
        'text': 'Issuer',
        'labelLocation': 'left-apart',
        'id': 'issuer-name-input',
        'mandatory': true,
        'value': issuerName,
        'onChange': setIssuerName,
      },
    },
    // SECTORS AND SUBSECTORS NEED REWAMPING IN THE BACKEND
    // UNCOMMENT ONCE DONE
    // {
    //   'type': 'select',
    //   'props': {
    //     'text': 'Sector',
    //     'labelLocation': 'left-apart',
    //     'id': 'sector-select',
    //     'fetchFunction': getGenericRequest,
    //     'fetchKey': 'sector_names',
    //     'fetchParams': 'sector_names',
    //     'currentValue': sectorId,
    //     'onChange': sectorChangeControler,
    //   },
    // },
    // {
    //   'type': 'select',
    //   'props': {
    //     'text': 'Subsector',
    //     'labelLocation': 'left-apart',
    //     'id': 'subsector-select',
    //     'fetchFunction': getGenericRequest,
    //     'fetchKey': 'subsector_names',
    //     'fetchParams': 'subsector_names',
    //     'currentValue': subSectorId,
    //     'onChange': subSectorChangeControler,
    //   },
    // },
  ];

  const instrumentData = [
    {
      'type': 'textbox',
      'props': {
        'text': 'Name',
        'labelLocation': 'left-apart',
        'id': 'name-input',
        'mandatory': true,
        'value': name,
        'onChange': setName,
      },
    },
    {
      'type': 'textbox',
      'props': {
        'text': 'Long Name',
        'labelLocation': 'left-apart',
        'id': 'short-name-input',
        'value': longName,
        'onChange': setLongName,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Intrument Class',
        'labelLocation': 'left-apart',
        'id': 'inst-class-select',
        'mandatory': true,
        'fetchFunction': getGenericRequest,
        'fetchKey': 'class_names',
        'fetchParams': 'inst_class_names',
        'currentValue': instClassId,
        'onChange': instClassChangeControler,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Domicile',
        'labelLocation': 'left-apart',
        'id': 'domicile-select',
        'fetchFunction': getGenericRequest,
        'fetchKey': 'country_names',
        'fetchParams': 'country_names',
        'currentValue': domicileId,
        'onChange': domicileChangeControler,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Currency',
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
      'type': 'textbox',
      'props': {
        'text': 'Ticker',
        'labelLocation': 'left-apart',
        'id': 'ticker-input',
        'value': ticker,
        'onChange': setTicker,
      },
    },
    {
      'type': 'select',
      'props': {
        'text': 'Ticker Type',
        'labelLocation': 'left-apart',
        'id': 'ticker-type-select',
        'fetchFunction': getGenericRequest,
        'fetchKey': 'type_names',
        'fetchParams': 'ticker_type_names',
        'currentValue': tickerTypeId,
        'onChange': tickerTypeChangeControler,
      },
    },
    ...(isNewIssuer === true ? newIssuerData : issuerData),
    {
      'type': 'checkbox',
      'props': {
        'text': 'New Issuer',
        'id': 'new-issuer-checkbox',
        'checked': isNewIssuer,
        'onChange': setIsNewIssuer,
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
      <h2>New Instrument</h2>
      <div className='d-flex justify-content-center spaced-div'>
        <GreenButton
          text={'Input New'}
          clickFunction={() => {
            setSubPage('manual');
          }}
        />
        <GreenButton
          text={'Download'}
          clickFunction={() => {
            setSubPage('download');
          }}
        />
      </div>
      <section className='d-flex justify-content-center top-split mt-4 py-5'>
        {subpage === 'manual' ? (
          <GreenForm
            formTitle='New Instrument'
            formList={instrumentData}
            onSubmit={submitInstrumentData}
            submitResult={postResponse}
          />
        ) : subpage === 'download' ? (
          <InstrumentDownload />
        ) : null}
      </section>
    </main>
  );
}
