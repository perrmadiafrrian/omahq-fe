const Login = (props) => {
  return (
    <section className="text-gray-700 bg-gray-100">
      <div className="container 2xl:px-100 lg:px-80 px-5 py-36 mx-auto flex flex-wrap items-center">
        <div className="w-full pr-0 xl:mb-4 lg:mb-3 md:mb-2">
          <h1 className="title-font font-bold lg:text-7xl text-6xl text-yellow-600 text-center">
            OmahQ
          </h1>
          <p className="leading-relaxed mt-4 lg:text-3xl text-2xl font-medium text-black text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <div className="relative mb-4">
            <input
              type="text"
              name="full-name"
              placeholder="Email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button className="text-white border-0 py-2 px-8 focus:outline-none font-medium rounded text-xl bg-yellow-600">
            Log In
          </button>
          <p className="text-sm text-yellow-500 py-5 text-center">
            Forgot Password?
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
