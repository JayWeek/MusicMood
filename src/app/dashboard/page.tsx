import { logout } from '../auth/actions';
import { createClient } from '@/lib/supabase/server';

export default async function TestDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', fontFamily: 'sans-serif' }}>
      <h2>Dashboard Area Secured!</h2>
      <p>Authenticated as: <strong>{user?.email}</strong></p>
      
      <form action={logout}>
        <button type="submit" style={{ padding: '8px', cursor: 'pointer', background: 'red', color: 'white', border: 'none' }}>
          Test Logout Action
        </button>
      </form>
    </div>
  );
}
