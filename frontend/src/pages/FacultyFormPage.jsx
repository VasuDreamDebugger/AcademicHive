import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {customAxios} from "../lib/axios.js"  

const initialState ={
    user: {
      name: '',
      email: '',
      password: '',
      role: 'Faculty',
      loginType: 'Faculty',
    },
    faculty: {
      department: '',
      roles: [
        {
          type: '',
          from: '',
          to: '',
        },
      ],
    },
  }
const CreateFacultyAccount = () => {
  const [formData, setFormData] = useState(initialState);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      user: { ...prev.user, [name]: value },
    }));
  };

  const handleFacultyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      faculty: { ...prev.faculty, [name]: value },
    }));
  };

  const handleRoleChange = (field, value) => {
    const updatedRole = { ...formData.faculty.roles[0], [field]: value };
    setFormData((prev) => ({
      ...prev,
      faculty: { ...prev.faculty, roles: [updatedRole] },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await customAxios.post('/create-account/faculty', formData);
      console.log('Faculty account created:', response.data);
      toast.success("Account Created");
      setFormData(initialState);
    } catch (err) {
        toast.error("Something went wrong");
      console.error('Error creating faculty account:', err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-gray-100 flex items-center justify-center px-4">
        <Toaster />
      <div className="w-full max-w-4xl bg-white p-10 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Create Faculty Account</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* User Fields */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              name="name"
              value={formData.user.name}
              onChange={handleUserChange}
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={formData.user.email}
              onChange={handleUserChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={formData.user.password}
              onChange={handleUserChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Faculty Fields */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              name="department"
              value={formData.faculty.department}
              onChange={handleFacultyChange}
              placeholder="Enter department"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <div className="border p-4 rounded-md bg-gray-50">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Role Assignment</h3>

              <label className="block text-sm font-medium text-gray-700">Role Type</label>
              <select
                value={formData.faculty.roles[0].type}
                onChange={(e) => handleRoleChange('type', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                required
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Director">Director</option>
                <option value="Placement">Placement</option>
                <option value="Examination">Examination</option>
                <option value="DSW">DSW</option>
              </select>

              <label className="block text-sm font-medium text-gray-700">From Date</label>
              <input
                type="date"
                value={formData.faculty.roles[0].from}
                onChange={(e) => handleRoleChange('from', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
              />

              <label className="block text-sm font-medium text-gray-700">To Date</label>
              <input
                type="date"
                value={formData.faculty.roles[0].to}
                onChange={(e) => handleRoleChange('to', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
            >
              Create Faculty Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFacultyAccount;
