export default function GreenCheckBox(props) {
  const { title, text, id, disabled, checked, onChange } = props;

  /*
    PROPS

    "title" : str - title above the checkbox,
    "text" : str - label to the right of the checkbox,
    "id" : str - id of the textbox,
    "disabled" : bool - whether the checkbox is read only or not - optional, defaults to false,
    "checked" : bool - whether the checkbox is checked or not - optional, defaults to false,
    "onChange" : callback function, will invert 'checked' value - optional    
    */

  const handleCheckbox = (event) => {
    if (typeof onChange !== 'undefined') {
      onChange(event.target.checked);
    }
  };

  return (
    <>
      <legend className='mb-0'>
        <strong>{title}</strong>
      </legend>
      {/* Checkbox styling is controlled by OS, will have to eventually replace by Material UI component */}
      <input
        type='checkbox'
        id={id}
        disabled={disabled}
        checked={checked}
        onChange={handleCheckbox}
      />
      <label className='ps-2 '>{text}</label>
    </>
  );
}
