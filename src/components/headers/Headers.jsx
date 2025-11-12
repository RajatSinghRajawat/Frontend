import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaPhone, FaEnvelope, FaUser } from 'react-icons/fa'
import logo from '../../assets/logo.png'

const Headers = ({ isAuthenticated }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

  
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false)
        setIsUserMenuOpen(false)
    }, [location])

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    };

    const getUserName = () => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userData = JSON.parse(user);
                const name = userData.name || 'User';
                const parts = name.split(' ');
                if (parts.length > 1) {
                    return `${parts[0]} ${parts[1][0]}.`;
                }
                return parts[0];
            } catch (e) {
                return 'User';
            }
        }
        return 'User';
    };

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Products', path: '/products', hasDropdown: true },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Blogs', path: '/blogs' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'How It Works', path: '/how-it-works' }
    ]

    const productDropdownItems = [
        { name: 'All Products', path: '/products' },
        { name: 'Paver Blocks', path: '/products/paver' },
        { name: 'Precast Walls', path: '/products/precast' },
        { name: 'Chain Link Fencing', path: '/products/chainlinks' },
        { name: 'Fencing Poles', path: '/products/fencingpoles' }
    ]

    const isActive = (path) => location.pathname === path

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mb-6${isScrolled ? ' backdrop-blur-md shadow-lg border-b border-gray-200' : ''}`}
            style={{ background: isScrolled ? '#fff' : '#fff' }}
        >
            {/* Top bar with contact info */}
            {/* <div className="hidden lg:block bg-white text-black">
                <div className="container mx-auto px-4 py-2">
                    <div className="flex justify-between items-center text-sm font-semibold">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <FaPhone className="text-blue-800" />
                                <span className="text-black font-bold">+91 98765 43210</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaEnvelope className="text-blue-800" />
                                <span className="text-black font-bold">rohitsunrise87@gmail.com</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-black font-bold">Mon - Sat: 9:00 AM - 6:00 PM</span>
                        </div>
                    </div>
                </div>
            </div> */}

            
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group">
                        <div className="flex items-center justify-center">
                            <img src={logo} alt="Shree Shyam Precast Logo" className="w-40 h-24   object-cover " />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.hasDropdown ? (
                                    <div className="relative">
                                        <button className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 font-semibold ${isActive(item.path)
                                            ? 'text-blue-700 bg-blue-50'
                                            : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50'
                                            }`}>
                                            <span>{item.name}</span>
                                            <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Dropdown Menu */}
                                        <div className="absolute text-gray-800 top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
                                            <div className="py-2">
                                                {productDropdownItems.map((dropdownItem) => (
                                                    <Link
                                                        key={dropdownItem.name}
                                                        to={dropdownItem.path}
                                                        className={`block px-4 py-2 text-sm transition-colors duration-200 font-semibold ${isActive(dropdownItem.path)
                                                            ? 'text-blue-700 bg-blue-50'
                                                            : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50'
                                                            }`}
                                                    >
                                                        {dropdownItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`px-3 py-2 rounded-lg transition-all duration-300 font-semibold ${isActive(item.path)
                                            ? 'text-blue-700 bg-blue-50'
                                            : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center space-x-4">
                        <Link
                            to="/contact"
                            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Get Quote
                        </Link>

                        {/* User Menu */}
                        {isAuthenticated && (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 text-gray-800 hover:text-blue-700 transition-colors duration-200"
                                >
                                    <FaUser className="w-5 h-5" />
                                    <span className="font-semibold">{getUserName()}</span>
                                </button>

                                {/* User Dropdown */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200">
                                        <div className="py-2">
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 rounded-lg hover:text-blue-700 hover:bg-blue-50 transition-colors duration-200 text-gray-800"
                    >
                        {isMenuOpen ? (
                            <FaTimes className="w-6 h-6" />
                        ) : (
                            <FaBars className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div style={{background:'#fff'}} className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen
                    ? 'max-h-screen opacity-100 visible'
                    : 'max-h-0 opacity-0 invisible'
                    }`}>
                    <div className="pt-4 pb-6 space-y-2 border-t border-gray-200 mt-4">
                        {navItems.map((item) => (
                            <div key={item.name}>
                                {item.hasDropdown ? (
                                    <div className="space-y-2">
                                        <div className="text-sm font-bold text-gray-800 px-3 py-2">
                                            {item.name}
                                        </div>
                                        {productDropdownItems.map((dropdownItem) => (
                                            <Link
                                                key={dropdownItem.name}
                                                to={dropdownItem.path}
                                                className={`block px-6 py-2 text-sm transition-colors duration-200 font-semibold ${isActive(dropdownItem.path)
                                                    ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-700'
                                                    : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50'
                                                    }`}
                                            >
                                                {dropdownItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`block px-3 py-2 rounded-lg transition-colors duration-200 font-semibold ${isActive(item.path)
                                            ? 'text-blue-700 bg-blue-50'
                                            : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* Mobile CTA and User Menu */}
                        <div className="pt-4 space-y-3 border-t border-gray-200">
                            <Link
                                to="/contact"
                                className="block w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-bold text-center shadow-lg"
                            >
                                Get Quote
                            </Link>

                            {isAuthenticated && (
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-gray-800 hover:text-blue-700 px-3 py-2 rounded-lg transition-colors duration-200 font-semibold"
                                >
                                    Logout ({getUserName()})
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Headers