
import './App.css'
import { LoginForm } from '@/components/login-form'
import { authClient } from '@/lib/auth-client'
import { Button } from './components/ui/button';
function App() {
    const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  
  if (!session) {
    return (
      <div className="flex min-h-svh items-center justify-center px-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    );
  }
 return (
    <div>
      <h1>Welcome, {session.user.email}</h1>
      <Button variant="default" onClick={() => authClient.signOut()}>Logout</Button>
    </div>
  );
}

export default App
