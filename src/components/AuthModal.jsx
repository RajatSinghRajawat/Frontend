import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png'
const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    state: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(`https://api.readymadewall.in${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
        onClose();
        setTimeout(() => window.location.reload(), 1200);
      } else {
        toast.error(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('An error occurred during authentication');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 text-left align-middle shadow-2xl transition-all relative border border-gray-100"
                style={{ maxWidth: '32rem' }} // max-w-xl
              >
                {/* Close Button */}
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
                  onClick={onClose}
                  aria-label="Close"
                >
                  &times;
                </button>
                {/* Logo/Brand */}
                <div className="flex flex-col items-center mb-6">
                  <img src={logo} alt="Logo" className="h-32 w-48 mb-2" />
                  <span className="text-2xl font-bold text-gray-900 tracking-tight">Shree Shyam Precast</span>
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-gray-900 mb-2 text-center"
                >
                  {isLogin ? 'Login to Your Account' : 'Create New Account'}
                </Dialog.Title>
                <div className="flex items-center justify-center mb-6">
                  <span className="text-gray-400 text-sm">
                    {isLogin ? 'Welcome back! Please login to continue.' : 'Create your account to get started.'}
                  </span>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <>
                      <div className="flex gap-4">
                        <div className="relative w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <FaUser />
                            </span>
                            <input
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="pl-10 pr-3 py-2 block w-full rounded-lg border border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm shadow-sm transition"
                              placeholder="Enter your name"
                            />
                          </div>
                        </div>
                        <div className="relative w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleChange}
                              className="pl-3 pr-3 py-2 block w-full rounded-lg border border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm shadow-sm transition"
                              placeholder="Enter your phone number"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            className="pl-3 pr-3 py-2 block w-full rounded-lg border border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm shadow-sm transition"
                            placeholder="Enter your address"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="relative w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="city"
                              required
                              value={formData.city}
                              onChange={handleChange}
                              className="pl-3 pr-3 py-2 block w-full rounded-lg border border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm shadow-sm transition"
                              placeholder="Enter your city"
                            />
                          </div>
                        </div>
                        <div className="relative w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="state"
                              required
                              value={formData.state}
                              onChange={handleChange}
                              className="pl-3 pr-3 py-2 block w-full rounded-lg border border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm shadow-sm transition"
                              placeholder="Enter your state"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FaEnvelope />
                      </span>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 pr-3 py-2 block w-full rounded-lg border border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm shadow-sm transition"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FaLock />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 pr-10 py-2 block w-full rounded-lg border border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm shadow-sm transition"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        tabIndex={-1}
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 rounded-lg shadow font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 text-base transition"
                    >
                      {isLogin ? 'Login' : 'Register'}
                    </button>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div className="flex-grow border-t border-gray-200" />
                  <span className="mx-3 text-gray-400 text-xs">or</span>
                  <div className="flex-grow border-t border-gray-200" />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-black font-medium"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? (
                      <>
                        Don't have an account?{' '}
                        <span className="text-indigo-600 hover:text-indigo-700 font-medium">Register</span>
                      </>
                    ) : (
                      <>
                        Already have an account?{' '}
                        <span className="text-indigo-600 hover:text-indigo-700 font-medium">Login</span>
                      </>
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthModal; 