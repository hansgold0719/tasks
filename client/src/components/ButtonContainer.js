const ButtonContainer = (props) => {
  return (
    <div className="text-center md:text-center flex flex-wrap my-5">
      {props.children}
    </div>
  );
};

export default ButtonContainer;
