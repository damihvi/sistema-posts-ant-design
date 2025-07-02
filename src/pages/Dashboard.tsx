import { Typography, Image, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px 20px',
      backgroundColor: '#fff',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Title level={1} style={{ 
          fontSize: '48px', 
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px',
          lineHeight: '1.2'
        }}>
          Bienvenido al Módulo de Posts
        </Title>
        
        <Paragraph style={{ 
          fontSize: '18px', 
          color: '#666',
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto 40px auto'
        }}>
          Este sistema permite listar, crear y analizar publicaciones.
        </Paragraph>
        
        <div style={{ marginBottom: '60px' }}>
          <Image
            src="https://picsum.photos/id/1025/800/300"
            alt="Slide 1"
            style={{ 
              width: '100%',
              maxWidth: '800px',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
            preview={false}
          />
        </div>
      </div>

      {/* Features Section */}
      <Row gutter={[32, 32]} style={{ marginBottom: '60px' }}>
        <Col xs={24} md={8}>
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <Title level={5} style={{ 
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '16px'
            }}>
              Ver Publicaciones
            </Title>
            <Paragraph style={{ 
              fontSize: '16px',
              color: '#666',
              marginBottom: '24px',
              lineHeight: '1.6'
            }}>
              Consulta todas las publicaciones.
            </Paragraph>
            <Button 
              type="primary"
              size="large"
              onClick={() => navigate('/posts')}
              style={{
                backgroundColor: '#1890ff',
                borderColor: '#1890ff',
                borderRadius: '6px',
                height: '44px',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Ver Posts
            </Button>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <Title level={5} style={{ 
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '16px'
            }}>
              Crear Nuevo Post
            </Title>
            <Paragraph style={{ 
              fontSize: '16px',
              color: '#666',
              marginBottom: '24px',
              lineHeight: '1.6'
            }}>
              Agrega una nueva publicación.
            </Paragraph>
            <Button 
              type="primary"
              size="large"
              onClick={() => navigate('/create')}
              style={{
                backgroundColor: '#52c41a',
                borderColor: '#52c41a',
                borderRadius: '6px',
                height: '44px',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Crear Post
            </Button>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <Title level={5} style={{ 
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '16px'
            }}>
              Estadísticas
            </Title>
            <Paragraph style={{ 
              fontSize: '16px',
              color: '#666',
              marginBottom: '24px',
              lineHeight: '1.6'
            }}>
              Analiza la información de tus publicaciones.
            </Paragraph>
            <Button 
              type="primary"
              size="large"
              onClick={() => navigate('/stats')}
              style={{
                backgroundColor: '#fa8c16',
                borderColor: '#fa8c16',
                borderRadius: '6px',
                height: '44px',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Ver Estadísticas
            </Button>
          </div>
        </Col>
      </Row>

      {/* Footer Note */}
      <div style={{ 
        textAlign: 'center',
        padding: '30px 20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        marginBottom: '40px'
      }}>
        <Paragraph style={{ 
          margin: 0,
          fontSize: '16px',
          color: '#666',
          fontWeight: '500'
        }}>
          Recuerda: Cada post debe tener título y contenido.
        </Paragraph>
      </div>
    </div>
  );
}
