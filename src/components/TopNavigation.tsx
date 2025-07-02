import { Menu, Layout, Button, Typography } from 'antd';
import { 
  HomeOutlined, 
  FileTextOutlined, 
  PlusOutlined, 
  BarChartOutlined,
  InfoCircleOutlined,
  MenuOutlined 
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const { Header } = Layout;
const { Text } = Typography;

export default function TopNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Inicio',
    },
    {
      key: '/posts',
      icon: <FileTextOutlined />,
      label: 'Gestión de Posts',
    },
    {
      key: '/create',
      icon: <PlusOutlined />,
      label: 'Crear Post',
    },
    {
      key: '/stats',
      icon: <BarChartOutlined />,
      label: 'Estadísticas',
    },
    {
      key: '/info',
      icon: <InfoCircleOutlined />,
      label: 'Información',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    setIsMobileMenuOpen(false);
  };

  return (
    <Header style={{ 
      background: '#fff',
      padding: '0 20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px'
    }}>
      {/* Logo/Título */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text 
          strong 
          style={{ 
            fontSize: 'clamp(16px, 4vw, 20px)', 
            color: '#1890ff',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          📝 Sistema de Posts
        </Text>
      </div>

      {/* Menú Desktop */}
      <div style={{ display: window.innerWidth > 768 ? 'block' : 'none' }}>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ 
            border: 'none',
            background: 'transparent',
            minWidth: '400px'
          }}
        />
      </div>

      {/* Botón Mobile */}
      <div style={{ display: window.innerWidth <= 768 ? 'block' : 'none' }}>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ fontSize: '18px' }}
        />
      </div>

      {/* Menú Mobile */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '64px',
          right: 0,
          background: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          borderRadius: '0 0 0 8px',
          minWidth: '200px',
          zIndex: 1001
        }}>
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ border: 'none' }}
          />
        </div>
      )}
    </Header>
  );
}
