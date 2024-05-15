import GreenButton from '../primitives/GreenButton';
import GreenTextBox from '../primitives/GreenTextBox';
import GreenCheckBox from '../primitives/GreenCheckBox';
import GreenRadioButtons from '../primitives/GreenRadioButtons';

export default function GreenForm(props) {
  const { formTitle, onSubmit, formList } = props;

  /*
        formList = [
            {"type": str - possible values: button, checkbox, radiogroup, textbox, select,
             "props": { same props as available for the component}
            },
            {},
        ]
    */

  return (
    <div className='d-flex flex-column'>
      <h3>{formTitle}</h3>
      <form onSubmit={onSubmit}>
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
                    defaultValue={value.props.defaultValue}
                    value={value.props.value}
                    length={value.props.length}
                    onChange={value.props.onChange}
                  />
                </fieldset>
              ))
            : (element = (
                <p key={index}>
                  this will be a combo-box that is not yet implemented
                </p>
              ));

          return element;
        })}
      </form>
    </div>
  );
}
