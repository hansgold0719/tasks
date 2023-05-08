const FormInput = (props) => (
  <input
    className={`text-sm ${props.width}  px-4 py-3 border border-solid border-gray-300 rounded mt-4 hover:outline-none focus:outline-none`}
    type={`${props.type}`}
    name={`${props.name}`}
    onChange={props.onChangeName}
    placeholder={`${props.placeholder}`}
  />
);

export default FormInput;
