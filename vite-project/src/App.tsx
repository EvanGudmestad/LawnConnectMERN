import './App.css'
// import { CustomerRegistrationForm } from '@/components/customer-registration';
// import { authClient } from '@/lib/auth-client'
// import { Button } from './components/ui/button';
import AppLayout from '@/components/layouts/app-layout';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { LandingPage } from '@/components/landing-page';
import { LoginForm } from '@/components/login-form';
import {CustomerRegistrationForm} from '@/components/customer-registration';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<CustomerRegistrationForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
//     const { data: session, isPending } = authClient.useSession();

//   if (isPending) {
//     return <div>Loading...</div>;
//   }

  
//   if (!session) {
//     return (
//       <div className="flex min-h-svh items-center justify-center px-4">
//         <div className="w-full max-w-md">
//           <CustomerRegistrationForm />
//         </div>
//       </div>
//     );
//   }
//  return (
//     <div>
//       <h1>Welcome, {session.user.email}</h1>
//       <Button variant="default" onClick={() => authClient.signOut()}>Logout</Button>
//     </div>
//   );
}

export default App
