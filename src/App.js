import './App.css';
import Landing from './components/PublicUI/Landing';
import Calendar from './components/GuidesUI/Calendar'
import Login from './components/GuidesUI/Login'
import ResetPassword from './components/GuidesUI/ResetPassword'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GuideUI from './components/GuidesUI/GuideUI';
import RequireAuth from './components/Auth/RequireAuth';
import { AuthProvider } from './components/Auth/AuthContext';
import Profile from './components/GuidesUI/Profile';
import Find from './components/PublicUI/Find';
import PublicUI from './components/PublicUI/PublicUI';
import GuideList from './components/GuidesUI/GuideList';
import RequestList from './components/GuidesUI/RequestList';
import Request from './components/GuidesUI/Request';
import Inbox from './components/GuidesUI/Inbox';
import { InboxProvider } from './components/context/InboxContext'
import Chat from './components/GuidesUI/Chat';
import ClientInbox from './components/PublicUI/ClientInbox';
import ClientChat from './components/PublicUI/ClientChat';
import FindGuides from './components/PublicUI/Guides/FindGuides';
import GuideProfile from './components/PublicUI/Guides/GuideProfile';
import Quote from './components/PublicUI/Quote';
import Cancel from "./components/PublicUI/CancelPayment"; 

function App() {
  return (
    
    <AuthProvider>
    <InboxProvider>
    <ToastContainer position='top-center' />
    <BrowserRouter>
      <Routes>
         {/*Public routes */}
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        
        <Route path='/quote/:id' element={<Quote />} />

        <Route path='/find' element={<PublicUI />}>
            <Route index element={<Find />} />
            <Route path='/find/guides' element={<FindGuides />} />
            <Route path='/find/guides/:id' element={<GuideProfile />} />
        </Route>

        {/*Client Auth routes */}
        <Route path='/public/inbox' element={<ClientInbox />} />
        <Route path='/public/inbox/client/:id' element={<ClientChat />} />
        <Route path='/public/inbox/guide/:id' element={<Chat />} />
       
        {/* Payment routes */}
        <Route path="/payments/success/:id" element={<Quote />} /> 
        <Route path="/payments/cancel" element={<Cancel />} /> 

        {/*Guides Auth routes */}
        <Route element={<RequireAuth  />} >
          <Route path='/guides' element={<GuideUI />}>
            <Route index element={<Calendar />} />
            <Route path='/guides/profile' element={<Profile />} />
            <Route path='/guides/list' element={<GuideList />} />
            <Route path='/guides/requests' element={<RequestList />} />
            <Route path='/guides/requests/:id' element={<Request />} />
            <Route path='/guides/inbox' element={<Inbox />} />
            <Route path='/guides/inbox/:id' element={<Chat />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </InboxProvider>
  </AuthProvider>
     
   
  );
}

export default App;
