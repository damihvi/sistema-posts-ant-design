import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import TopNavigation from './TopNavigation';

const { Content } = Layout;

export default function AppLayout() {
  return (
    <Layout style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      width: '100%',
      overflow: 'hidden'
    }}>
      <TopNavigation />
      <Content style={{ 
        backgroundColor: '#f5f5f5',
        minHeight: 'calc(100vh - 64px)',
        width: '100%',
        boxSizing: 'border-box',
        padding: 0
      }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
