export default function GreenTextBox(props) {
  const {
    text,
    labelLocation,
    id,
    readOnly,
    defaultValue,
    value = '',
    length,
    onChange,
  } = props;

  /*
    PROPS

    "text" : str - label text,
    "labelLocation" : str - possible values: left, left-apart, above,
    "id" : str - id of the textbox,
    "readOnly" : bool - whether the textbox is read only or not - optional, defaults to false,
    "mandatory": bool - whether the field has to be filled out for form submission - optional, defaults to false,
    "value" : str - current value of the textbox - optional,
    "length" : int - length of the text box - optional, defaults to 20,
    "onChange" : callback function, usually a setStateVariable - optional

    */

  const handleTextbox = (event) => {
    if (typeof onChange !== 'undefined') {
      onChange(event.target.value);
    }
  };

  return (
    <>
      {labelLocation === 'left-apart' ? (
        <div className='row py-2'>
          <div className='col text-end'>
            <label
              htmlFor={`${id.toLowerCase().replace(' ', '-')}-input`}
              className='me-2'
            >
              {' '}
              {(text[0].toUpperCase() + text.substring(1)).replace('_', ' ')}:
            </label>
          </div>
          <div className='col text-start'>
            <input
              id={`${id.toLowerCase().replace(' ', '-')}-input`}
              className='me-2'
              type='text'
              value={value}
              readOnly={readOnly}
              onChange={handleTextbox}
            />
          </div>
        </div>
      ) : labelLocation === 'left' ? (
        <>
          <label
            htmlFor={`${id.toLowerCase().replace(' ', '-')}-input`}
            className='me-2'
          >
            {' '}
            {(text[0].toUpperCase() + text.substring(1)).replace('_', ' ')}:
          </label>
          <input
            id={`${id.toLowerCase().replace(' ', '-')}-input`}
            className='me-2'
            type='text'
            value={value}
            readOnly={readOnly}
            onChange={handleTextbox}
          />
        </>
      ) : labelLocation === 'above' ? (
        <div className='left-aligned-input'>
          <label htmlFor={`${id.toLowerCase().replace(' ', '-')}-input`}>
            {' '}
            {(text[0].toUpperCase() + text.substring(1)).replace('_', ' ')}:
          </label>
          <input
            id={`${id.toLowerCase().replace(' ', '-')}-input`}
            type='text'
            value={value}
            onChange={handleTextbox}
            readOnly={readOnly}
          />
        </div>
      ) : null}
    </>
  );
}
