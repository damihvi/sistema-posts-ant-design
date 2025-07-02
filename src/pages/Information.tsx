import { 
  Card, 
  Typography, 
  Button,
  Space
} from 'antd';
import { 
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function Information() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      padding: '24px', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <Card style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '24px' }}>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/')}
            >
              Volver al inicio
            </Button>
          </Space>
          <Title level={2} style={{ marginTop: '16px', marginBottom: '24px' }}>
            Información del Sistema
          </Title>
        </div>

        <Paragraph style={{ 
          fontSize: '16px', 
          lineHeight: '1.6',
          textAlign: 'justify'
        }}>
          Este sistema permite gestionar publicaciones y obtener estadísticas básicas para práctica de ReactJS
        </Paragraph>
      </Card>
    </div>
  );
}
