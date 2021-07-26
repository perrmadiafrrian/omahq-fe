import { GoogleSignin } from "../components";

const Login = (props) => {
  return (
    <section className="text-gray-700 bg-gray-50">
      <div className="container 2xl:px-100 lg:px-80 px-5 lg:py-36 py-10 place-content-evenly mx-auto flex flex-wrap items-center min-h-screen">
        <div className="w-full pr-0 xl:mb-4 lg:mb-3 md:mb-2">
          <h1 className="title-font font-bold lg:text-7xl text-6xl text-yellow-600 text-center">
            OmahQ
          </h1>
          <p className="leading-relaxed mt-4 lg:text-2xl text-xl font-medium text-black text-center">
            Check your household needs and manage them is easier than ever
          </p>
        </div>
        <div className="bg-gray-200 shadow-inner rounded-lg p-8 lg:py-10 py-20 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <div className="relative mb-4 text-xl text-center">
            One touch Sign in with Google
          </div>
          <div className="relative mb-4">
            <GoogleSignin />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
