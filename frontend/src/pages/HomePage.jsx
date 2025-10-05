import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login-options'); // Adjust to your login route
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col justify-center items-center px-6 py-12">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-6">
          Welcome to Our College Academic Portal
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Designed for students, faculty, and directors to collaborate, manage roles, and track academic progress with clarity and control.
        </p>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">🔐 Role-Based Access</h2>
            <p className="text-gray-600">
              Students, faculty, and directors each have tailored access to features, ensuring secure and purposeful interactions across the platform.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">🧠 Threaded Discussions</h2>
            <p className="text-gray-600">
              Engage in structured academic conversations with threaded comments, bookmarks, and contextual replies that foster deeper learning.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">📊 Analytics Dashboard</h2>
            <p className="text-gray-600">
              Directors and faculty can monitor student engagement, performance trends, and course metrics in real-time with intuitive visualizations.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">🛠️ Audit Trails & History</h2>
            <p className="text-gray-600">
              Every role change, comment, and submission is tracked with historical context, ensuring transparency and accountability across the system.
            </p>
          </div>
        </div> */}

        <button
          onClick={handleGetStarted}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium py-3 px-8 rounded-full transition duration-200 shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
