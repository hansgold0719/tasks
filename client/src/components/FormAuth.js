
const FormAuth = (props) => (
    <div className="w-10/12 max-w-lg p-4 bg-purple-400 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
        <div className="text-center md:text-center my-5">
          <label className="mr-1 text-5xl text-white font-light font-sans">
            SignUp{" "}
          </label>
        </div>
        {props.children}
    </div>
  );
  
export default FormAuth;