import { useCallback, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import api from '../../api/axios'; // ← uses your existing axios with baseURL already set

export default function PlaidConnect({ onSubscriptionsImported }) {
  const [linkToken, setLinkToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch link_token from backend as soon as this component loads
  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const res = await api.post('/plaid/create-link-token');
        // api already has baseURL = http://localhost:5000/api
        // so this calls: http://localhost:5000/api/plaid/create-link-token
        setLinkToken(res.data.link_token);
      } catch (err) {
        console.error('Failed to fetch link token:', err);
        setError('Could not connect to bank service. Check your server.');
      }
    };
    fetchLinkToken();
  }, []);

  // Runs automatically after user logs into their bank inside Plaid widget
  const onSuccess = useCallback(async (public_token, metadata) => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Exchange public_token for access_token (saved in DB)
      await api.post('/plaid/exchange-token', {
        public_token,
        institution_name: metadata.institution?.name,
      });

      // Step 2: Fetch the recurring subscriptions Plaid detected
      const res = await api.get('/plaid/recurring-subscriptions');
      onSubscriptionsImported(res.data.subscriptions);
    } catch (err) {
      console.error('Plaid sync failed:', err);
      setError('Failed to import subscriptions. Try again.');
    } finally {
      setLoading(false);
    }
  }, [onSubscriptionsImported]);

  const { open, ready } = usePlaidLink({ token: linkToken, onSuccess });

  return (
    <div>
      <button
        onClick={() => open()}
        disabled={!ready || loading}
        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
          ${ready && !loading
            ? 'bg-[var(--accent)] text-white hover:opacity-90 cursor-pointer'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
      >
        {loading
          ? '⏳ Importing...'
          : !linkToken
          ? '⏳ Loading...'
          : ready
          ? '🏦 Connect Bank Account'
          : '⏳ Preparing...'}
      </button>

      {/* Shows error message if something goes wrong */}
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}

      {/* Shows "button disabled" reason clearly during dev */}
      {!ready && !error && linkToken && (
        <p className="mt-2 text-xs text-gray-400">Setting up Plaid widget...</p>
      )}
    </div>
  );
}
