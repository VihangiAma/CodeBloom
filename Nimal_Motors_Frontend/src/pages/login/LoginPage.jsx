import "./login.css";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center relative">
      {/* Background image */}
      <div className="pic-Bg"></div>

      {/* Login form */}
      <div className="w-[400px] h-[400px] bg-blur bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col items-center justify-center z-10">
        <h1 className="text-3xl font-bold text-white mb-6">LOGIN</h1>

        <form className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-md bg-gray-700 bg-opacity-40 text-white placeholder-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-md bg-gray-700 bg-opacity-40 text-white placeholder-white focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-blue-900 font-semibold py-2 rounded-md hover:bg-blue-200 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
