import   { useState } from 'react';

const AuthForm = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        {isLogin ? (
          <>
            <h2 className="text-2xl mb-4">Login</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
            <p className="mt-4 text-center">
              Don't have an account? <span onClick={() => setIsLogin(false)} className="text-blue-500 cursor-pointer">Sign Up</span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl mb-4">Sign Up</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Username</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Sign Up</button>
            </form>
            <p className="mt-4 text-center">
              Already have an account? <span onClick={() => setIsLogin(true)} className="text-blue-500 cursor-pointer">Login</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
