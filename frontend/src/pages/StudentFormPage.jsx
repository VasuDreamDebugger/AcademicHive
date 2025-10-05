import React, { useState } from 'react';
import toast ,{Toaster} from "react-hot-toast";
import {customAxios} from "../lib/axios.js"

const initialState={
  user: {
    name: '',
    email: '',
    password: '',
    role: 'Student',
    loginType: 'Student',
  },
  student: {
    branch: '',
    year: '',
    academicProfiles: [
      {
        title: '',
        skills: [],
        resume: '',
        tags: [],
      },
    ],
  },
}

const CreateStudentAccount = () => {
  const [formData, setFormData] = useState(initialState);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      user: { ...prev.user, [name]: value },
    }));
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      student: { ...prev.student, [name]: value },
    }));
  };

  const handleAcademicProfileChange = (field, value) => {
    const updatedProfile = { ...formData.student.academicProfiles[0], [field]: value };
    setFormData((prev) => ({
      ...prev,
      student: { ...prev.student, academicProfiles: [updatedProfile] },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await customAxios.post('/create-account/student',formData);
      toast.success("Account Created");
      console.log('Account created:', response.data);

    } catch (err) {
      console.error('Error creating account:', err);
      toast.error(err.response.data.message)
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
      <Toaster />
      <div className="w-full max-w-4xl bg-white p-10 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Create Student Account</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* User Fields */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              name="name"
              value={formData.user.name}
              onChange={handleUserChange}
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={formData.user.email}
              onChange={handleUserChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={formData.user.password}
              onChange={handleUserChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Student Fields */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Branch</label>
            <select
              name="branch"
              value={formData.student.branch}
              onChange={handleStudentChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CE">CE</option>
            </select>

            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              name="year"
              type="number"
              min="1"
              max="4"
              value={formData.student.year}
              onChange={handleStudentChange}
              placeholder="Enter year"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <div className="border p-4 rounded-md bg-gray-50">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Academic Profile</h3>

              <input
                type="text"
                value={formData.student.academicProfiles[0].title}
                onChange={(e) => handleAcademicProfileChange('title', e.target.value)}
                placeholder="Profile Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                required
              />

              <input
                type="text"
                value={formData.student.academicProfiles[0].resume}
                onChange={(e) => handleAcademicProfileChange('resume', e.target.value)}
                placeholder="Resume URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
              />

              <input
                type="text"
                value={formData.student.academicProfiles[0].skills.join(', ')}
                onChange={(e) =>
                  handleAcademicProfileChange('skills', e.target.value.split(',').map((s) => s.trim()))
                }
                placeholder="Skills (comma-separated)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
              />

              <input
                type="text"
                value={formData.student.academicProfiles[0].tags.join(', ')}
                onChange={(e) =>
                  handleAcademicProfileChange('tags', e.target.value.split(',').map((t) => t.trim()))
                }
                placeholder="Tags (comma-separated)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudentAccount;
