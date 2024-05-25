import { useEffect, useState } from 'react';

export default function GreenSelect(props) {
  const {
    text,
    labelLocation,
    id,
    options,
    fetchFunction,
    fetchKey,
    fetchParams,
    readOnly,
    mandatory,
    currentValue,
    length,
    onChange,
  } = props;

  /*
    PROPS

    "text" : str - label text,
    "labelLocation" : str - possible values: left, left-apart, above,
    "id" : str - id of the textbox,
    "options": array - a list of select options,
    "fetchFunction": function - to retrieve option values from API - optional,
    "fetchKey": string - key on which the fetchFunction return data is found,
    "fetchParams": str - parameters the fetch function may need - optional,
    "readOnly" : bool - whether the textbox is read only or not - optional, defaults to false,
    "mandatory": bool - whether the field has to be filled out for form submission - optional, defaults to false,
    "currentValue" : str - current value of the textbox - optional,
    "length" : int - length of the text box - optional, defaults to 20,
    "onChange" : callback function, will receive the value and text of the currently selected option - optional

    */

  const [content, setContent] = useState(['', 'Retrieving options...']);

  useEffect(() => {
    setContent(['', 'Retrieving options...']);
    if (fetchFunction) {
      fetchFunction(fetchParams)
        .then((data) => {
          setContent(Array(' ').concat(data[fetchKey]));
          //onChange('', '');
        })
        .catch((error) => {
          setContent(['An error occured']);
        });
    } else {
      setContent(options);
    }
  }, [fetchParams]);

  const handleSelect = (event) => {
    if (typeof onChange !== 'undefined') {
      onChange(
        event.target.value,
        event.target.options[event.target.selectedIndex].text
      );
    }
  };

  return (
    <>
      {labelLocation === 'left-apart' ? (
        <div className='row py-2'>
          <div className='col text-end'>
            <label
              htmlFor={`${id.toLowerCase().replace(' ', '-')}-select`}
              className={mandatory ? 'me-2 required' : 'me-2'}
            >
              {' '}
              {(text[0].toUpperCase() + text.substring(1)).replace('_', ' ')}:
            </label>
          </div>
          <div className='col text-start'>
            <select
              id={`${id.toLowerCase().replace(' ', '-')}-select`}
              className='me-2'
              value={currentValue}
              onChange={handleSelect}
            >
              {content.map((value, index) => {
                return (
                  <option
                    key={index}
                    value={value.toLowerCase().replace(' ', '-')}
                  >
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      ) : labelLocation === 'above' ? (
        <div className='left-aligned-input'>
          <label
            htmlFor={`${id.toLowerCase().replace(' ', '-')}-select`}
            className={mandatory ? 'required' : ''}
          >
            {' '}
            {(text[0].toUpperCase() + text.substring(1)).replace('_', ' ')}:
          </label>
          <select
            id={`${id.toLowerCase().replace(' ', '-')}-select`}
            className='me-2'
            value={currentValue}
            onChange={handleSelect}
          >
            {content.map((value, index) => {
              return (
                <option
                  key={index}
                  value={value.toLowerCase().replace(' ', '-')}
                >
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      ) : null}
    </>
  );
}
