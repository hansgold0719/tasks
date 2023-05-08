const Container = (props) => (
  <section className="min-h-screen flex flex-col justify-center space-y-10 md:space-y-0 md:space-x-16 items-center md:mx-0 md:my-0 bg-slate-300">
    {props.children}
  </section>
);

export default Container;
