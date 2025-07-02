import { Layout, Typography } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content, Footer } = Layout;
const { Text } = Typography;

export default function AppLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ 
        background: '#fff',
        minHeight: 'calc(100vh - 70px)'
      }}>
        <Outlet />
      </Content>
      
      <Footer style={{ 
        textAlign: 'center',
        background: '#001529',
        color: '#fff',
        padding: '24px 50px'
      }}>
        <Text style={{ color: '#fff' }}>
          © 2025 - Sistema de Posts - Taller Académico
        </Text>
      </Footer>
    </Layout>
  );
}
