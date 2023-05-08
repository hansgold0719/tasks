const NavBar = (props) => (
  <div className=" py-3 w-full bg-violet-950 text-right flex justify-end">
    <button
      onClick={props.handleLogOut}
      className="px-4 py-2 mx-2 text-gray-100 rounded-md border border-gray-400 focus:outline-none focus:border-gray-600 flex justify-center align-middle items-center"
    >
      LogOut
    </button>
  </div>
);

export default NavBar;
