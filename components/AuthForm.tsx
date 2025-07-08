'use client';

import { useState, useTransition } from 'react';
import { signup, login } from '@/app/actions/auth.actions';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const path = usePathname();
  const isSignup = path.includes("/signup");
  const handleAuth = () => {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      try {
        if (mode === 'signup') {
          const res = await signup({ email, password, fullName });
          if (res?.status === 'confirm_email') {
            setSuccess(res.message);
            return;
          }
          setSuccess('Signup successful!');
          router.push('/');
        } else {
          const res = await login(email, password);
          setSuccess('Login successful!');
          router.push('/');
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      }
    });
  };


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAuth();
      }}
      className="space-y-4 p-6 max-w-md mx-auto border rounded"
    >
      <h2 className="text-2xl font-bold">{mode === 'signup' ? 'Sign Up' : 'Login'}</h2>

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded"
      />

      {mode === 'signup' && (
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
        />
      )}

      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white w-full py-2 rounded hover:bg-gray-900"
      >
        {isPending
          ? 'Processing...'
          : mode === 'signup'
            ? 'Sign Up'
            : 'Login'}
      </button>

      <p className="text-sm text-center">
        {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
        <button
          type="button"
          onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
          className="text-blue-600 underline ml-1"
        >
          {mode === 'signup' ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </form>
  );
}
