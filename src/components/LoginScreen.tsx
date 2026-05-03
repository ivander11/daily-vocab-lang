import { Mail } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface LoginScreenProps {
  onDemoLogin: (email: string) => void;
}

export function LoginScreen({ onDemoLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage('');

    if (!email.trim()) {
      setMessage('Enter an email to continue.');
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      onDemoLogin(email);
      return;
    }

    setIsSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    });
    setIsSending(false);
    setMessage(error ? error.message : 'Check your email for the login link.');
  }

  return (
    <main className="login-screen">
      <section className="login-panel">
        <div className="brand-mark">字</div>
        <h1>Daily Vocab</h1>
        <p>Chinese to English words matched to your level.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email</label>
          <div className="input-row">
            <Mail size={18} />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <button className="primary-button" disabled={isSending} type="submit">
            {isSending ? 'Sending...' : isSupabaseConfigured ? 'Send login link' : 'Continue demo'}
          </button>
        </form>
        {message ? <p className="form-message">{message}</p> : null}
      </section>
    </main>
  );
}
