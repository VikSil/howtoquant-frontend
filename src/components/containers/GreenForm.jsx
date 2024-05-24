import { useState } from 'react';

import GreenButton from '../primitives/GreenButton';
import GreenTextBox from '../primitives/GreenTextBox';
import GreenCheckBox from '../primitives/GreenCheckBox';
import GreenRadioButtons from '../primitives/GreenRadioButtons';
import GreenSelect from '../primitives/GreenSelect';

export default function GreenForm(props) {
  const { formTitle, onSubmit, formList, submitResult} = props;

  /*
        formList = [
            {"type": str - possible values: button, checkbox, radiogroup, textbox, select,
             "props": { same props as available for the component}
            },
            {},
        ]
    */

  const [error, setError] = useState(false);
  


  const submitFunction = (event) => {
    event.preventDefault();
    // Check if any of the mandatory fields are left empty
    const emptyFields = formList.filter(
      (element) =>
        element.props.mandatory === true && element.props.value.length === 0
    );
    if (emptyFields.length > 0) {
      // if there are empty mandatory fields
      setError('Please fill out all mandatory fields');
    } else {
      // if all mandatory fields are filled - do whatever the form does
      setError('');
      if (typeof onSubmit !== 'undefined') {
        onSubmit();
      }
    }
  };

  return (
    <div className='d-flex flex-column'>
      <h3>{formTitle}</h3>
      <form onSubmit={submitFunction}>
        {formList.map((value, index) => {
          let element = '';
          value.type == 'button'
            ? (element = (
                <fieldset className='pb-2 text-end' key={index}>
                  <GreenButton
                    text={value.props.text}
                    id={value.props.id}
                    btntype={value.props.btntype || 'submit'}
                    isDisabled={value.props.isDisabled}
                    clickFunction={value.props.clickFunction}
                  />
                </fieldset>
              ))
            : value.type == 'checkbox'
            ? (element = (
                <fieldset className='pb-2 text-end' key={index}>
                  <GreenCheckBox
                    text={value.props.text}
                    title={value.props.title}
                    id={value.props.id}
                    disabled={value.props.disabled}
                    defaultChecked={value.props.checked}
                  />
                </fieldset>
              ))
            : value.type == 'radiogroup'
            ? (element = (
                <fieldset className='pb-2 text-end' key={index}>
                  <GreenRadioButtons radioProps={value.props} key={index} />
                </fieldset>
              ))
            : value.type == 'textbox'
            ? (element = (
                <fieldset key={index}>
                  <GreenTextBox
                    text={value.props.text}
                    labelLocation={value.props.labelLocation}
                    id={value.props.id}
                    readOnly={value.props.readOnly}
                    mandatory = {value.props.mandatory}
                    value={value.props.value}
                    length={value.props.length}
                    onChange={value.props.onChange}
                  />
                </fieldset>
              ))
            : value.type == 'select'
            ? (element = (
                <fieldset key={index}>
                  <GreenSelect
                    text={value.props.text}
                    labelLocation={value.props.labelLocation}
                    id={value.props.id}
                    fetchFunction = {value.props.fetchFunction}
                    fetchKey={value.props.fetchKey}
                    fetchParams={value.props.fetchParams}
                    readOnly={value.props.readOnly}
                    mandatory = {value.props.mandatory}
                    currentValue={value.props.currentValue}
                    length={value.props.length}
                    onChange={value.props.onChange}
                  />
                </fieldset>
              ))
            : (element = (
                <p key={index}>
                  Unrecognised element type
                </p>
              ));

          return element;
        })}
      </form>
      {submitResult && (
                  <p className='text-end pe-2 py-2'>{submitResult}</p>
                )}
      {error && (
        <p className='error-class text-end pe-2 py-2'>{error}</p>
      )}
    </div>
  );
}
