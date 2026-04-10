import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { apiFetch } from '../utils/api';

const SignInPage = ({ onSignIn, onNavigate }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const switchMode = () => {
        setIsRegistering(prev => !prev);
        setError(null);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (isRegistering && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';

        try {
            const { access_token } = await apiFetch(endpoint, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            onSignIn(access_token);
        } catch (err) {
            setError(err.message || (isRegistering ? 'Sign up failed.' : 'Sign in failed.'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-wellness-gray dark:bg-gray-900 transition-colors duration-300 flex flex-col font-sans overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-wellness-blue/50 to-transparent dark:from-blue-900/20 rounded-full blur-3xl opacity-60 -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>

            <nav className="w-full px-8 lg:px-16 py-8 z-10 flex">
                <button onClick={() => onNavigate('landing')} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-wellness-accent to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-[0_4px_12px_rgba(96,165,250,0.3)] group-hover:shadow-[0_6px_16px_rgba(96,165,250,0.4)] transition-all">
                        M
                    </div>
                    <span className="text-[22px] font-bold text-gray-800 dark:text-white tracking-tight group-hover:opacity-80 transition-opacity">MindSpace</span>
                </button>
            </nav>

            <main className="flex-1 flex items-center justify-center p-6 z-10 w-full mb-12">
                <div className="w-full max-w-md animate-fade-in-up">
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] dark:shadow-none border border-white/50 dark:border-gray-700/50 p-10 md:p-12">

                        {/* Toggle tabs */}
                        <div className="flex bg-gray-100 dark:bg-gray-700/50 rounded-2xl p-1 mb-10">
                            <button
                                type="button"
                                onClick={() => !isRegistering || switchMode()}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${!isRegistering
                                    ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                            >
                                Sign In
                            </button>
                            <button
                                type="button"
                                onClick={() => isRegistering || switchMode()}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${isRegistering
                                    ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
                                {isRegistering ? 'Create an account' : 'Welcome back'}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                {isRegistering ? 'Start your journey of reflection.' : 'Continue your journey of reflection.'}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-200 border border-red-100 dark:border-red-800 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 ml-1">Email address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-5 py-4 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 focus:border-blue-200 dark:focus:border-blue-700 transition-all text-gray-800 dark:text-white shadow-inner dark:shadow-none placeholder-gray-400 dark:placeholder-gray-500 font-medium"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 ml-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-5 py-4 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 focus:border-blue-200 dark:focus:border-blue-700 transition-all text-gray-800 dark:text-white shadow-inner dark:shadow-none placeholder-gray-400 dark:placeholder-gray-500 font-medium"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password — only shown when registering */}
                            {isRegistering && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 ml-1">Confirm Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-12 pr-5 py-4 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-100/50 dark:focus:ring-blue-900/50 focus:border-blue-200 dark:focus:border-blue-700 transition-all text-gray-800 dark:text-white shadow-inner dark:shadow-none placeholder-gray-400 dark:placeholder-gray-500 font-medium"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Remember me — only shown on sign in */}
                            {!isRegistering && (
                                <div className="flex items-center justify-between mt-2 mb-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-wellness-accent focus:ring-wellness-accent/50 cursor-pointer" />
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Remember me</span>
                                    </label>
                                    <a href="#" className="text-sm font-medium text-wellness-accent hover:text-wellness-accent-hover transition-colors">Forgot password?</a>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-4 rounded-[1.5rem] font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${isLoading
                                    ? 'bg-blue-400 cursor-wait'
                                    : 'bg-wellness-accent hover:bg-wellness-accent-hover shadow-[0_8px_20px_rgba(96,165,250,0.3)] hover:shadow-[0_12px_25px_rgba(96,165,250,0.4)] hover:-translate-y-0.5'
                                }`}
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        {isRegistering ? 'Create Account' : 'Sign In'}
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SignInPage;