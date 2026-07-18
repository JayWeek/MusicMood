import { login, signUp } from '../actions/auth';

export default function IntegrationTestPage() {
  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', fontFamily: 'sans-serif' }}>
      <h2>MusicMood Foundation Test</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input name="email" type="email" placeholder="Test Email" required style={{ padding: '8px' }} />
        <input name="password" type="password" placeholder="Test Password" required style={{ padding: '8px' }} />
        
        {/* Wrap actions inline to safely consume and discard the returned promise object payload */}
        <button 
          formAction={async (formData) => {
            'use server';
            await signUp(formData);
          }} 
          style={{ padding: '8px', cursor: 'pointer' }}
        >
          Test Register Action
        </button>
        
        <button 
          formAction={async (formData) => {
            'use server';
            await login(formData);
          }} 
          style={{ padding: '8px', cursor: 'pointer' }}
        >
          Test Login Action
        </button>
      </form>
    </div>
  );
}
