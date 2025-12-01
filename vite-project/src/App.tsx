import './App.css'
// import { CustomerRegistrationForm } from '@/components/customer-registration';
//import { authClient } from '@/lib/auth-client'
// import { Button } from './components/ui/button';
import AppLayout from '@/components/layouts/app-layout';
import { Routes, Route } from 'react-router-dom';
import { LawnConnectLanding } from '@/components/lawn-connect-landing';
import { LoginForm } from '@/components/login-form';
import { CustomerRegistrationForm } from '@/components/customer-registration';
import { UserList } from '@/components/user-list';
import { UserEditor } from '@/components/user-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  function showError(message: string) {
    toast(message, { type: 'error', position: 'bottom-right' });
  }
  function showSuccess(message: string) {
    toast(message, { type: 'success', position: 'bottom-right' });
  }
  return (
    <>
      <ToastContainer aria-label="toast" />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LawnConnectLanding />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<CustomerRegistrationForm />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/users/:userId/edit" element={<UserEditor showError={showError} showSuccess={showSuccess} />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </>
  );

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
