import { Link } from "react-router-dom";

const LabelAuth = (props) => (
  <span className="text-center w-full my-3">
    <label>{`${props.label}`}{` `}</label>
    <Link to={`/${props.link}`} className="link-primary w-full text-center">
      <label className=" border-b-2 border-b-purple-800 cursor-pointer">
      {`${props.linkLabel}`}
      </label>
    </Link>
  </span>
);

export default LabelAuth;