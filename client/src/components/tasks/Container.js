const Container = (props) => (
    <section className="min-h-screen flex flex-col bg-fuchsia-200 items-center pb-10">
        {props.children}
    </section>
  );
  
  export default Container;