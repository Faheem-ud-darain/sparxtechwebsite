import { useState } from 'react';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface UseContactFormReturn {
  formData: ContactFormData;
  status: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage: string | null;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
}

const INITIAL_STATE: ContactFormData = { name: '', email: '', message: '' };

/**
 * Handles contact-form state, validation, and submission.
 *
 * By default it POSTs to the `/api/contact` endpoint (or wherever
 * VITE_CONTACT_ENDPOINT points). Swap out the fetch URL for any
 * backend you like — Formspree, Supabase Edge Function, etc.
 */
export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_STATE);
  const [status, setStatus] = useState<UseContactFormReturn['status']>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    // Basic client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const endpoint =
        import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      setStatus('success');
      setFormData(INITIAL_STATE);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong.',
      );
    }
  };

  const reset = () => {
    setFormData(INITIAL_STATE);
    setStatus('idle');
    setErrorMessage(null);
  };

  return { formData, status, errorMessage, handleChange, handleSubmit, reset };
}
