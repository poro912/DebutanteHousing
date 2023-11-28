import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import Nonmem from './routes/Nonmem';
import Storage from './routes/Storage';
import Shop from './routes/Shop';
import Shopdetail from './routes/Shopdetail';
import Join from './routes/Join';
import Friends from './routes/Friends';
import Homec from './routes/Homecopy';
import Login1 from './routes/Login1';
import Mypage from './routes/Mypage';
import APITest from './routes/APITest';
import Profil from './routes/Profil';
import Upload from './routes/Upload';
import FriendRoom from "./routes/FriendRoom"


const RouterPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<Login1 />} />
        <Route path="/Home" element={<Homec />} />
        <Route path="/Non" element={<Nonmem />} />
        <Route path="/Storage" element={<Storage />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Shopdetail/:id" element={<Shopdetail />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Friends" element={<Friends />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/APITest" element={<APITest />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/FriendRoom/:id" element={<FriendRoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterPage;
