import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Browse from '@/pages/Browse';
import AddItem from '@/pages/AddItem';
import Offers from '@/pages/Offers';
import Chat from '@/pages/Chat';
import Profile from '@/pages/Profile';
import AdminDashboard from '@/pages/AdminDashboard';
import NotFound from '@/pages/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/add-item" element={<AddItem />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
