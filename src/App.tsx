import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES';
import { PostProvider } from './context/PostContext';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import PostList from './pages/PostList';
import PostForm from './pages/PostForm';
import Statistics from './pages/Statistics';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={esES}>
      <PostProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="posts" element={<PostList />} />
              <Route path="create" element={<PostForm />} />
              <Route path="edit/:id" element={<PostForm />} />
              <Route path="stats" element={<Statistics />} />
            </Route>
          </Routes>
        </Router>
      </PostProvider>
    </ConfigProvider>
  );
}

export default App;
