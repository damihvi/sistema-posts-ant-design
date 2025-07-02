import { Typography, Image, Card, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      padding: '15px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Title level={1} style={{ 
          fontSize: 'clamp(24px, 5vw, 32px)', 
          fontWeight: 'normal',
          color: '#000',
          marginBottom: '15px',
          lineHeight: '1.2'
        }}>
          Bienvenido al Módulo de Posts
        </Title>
        
        <Paragraph style={{ 
          fontSize: 'clamp(14px, 3vw, 16px)', 
          color: '#000',
          marginBottom: '30px',
          maxWidth: '90%',
          margin: '0 auto 30px auto'
        }}>
          Este sistema permite listar, crear y analizar publicaciones.
        </Paragraph>
        
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <Image
            src="https://picsum.photos/id/1025/800/300"
            alt="Slide 1"
            style={{ 
              maxWidth: '100%',
              width: '100%',
              height: 'auto',
              borderRadius: '8px'
            }}
            preview={false}
          />
        </div>
      </div>

      {/* Features Section */}
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Ver Publicaciones */}
        <Card 
          style={{ 
            marginBottom: '20px', 
            cursor: 'pointer',
            width: '100%',
            boxSizing: 'border-box'
          }}
          hoverable
          onClick={() => navigate('/posts')}
        >
          <Title level={5} style={{ 
            fontSize: 'clamp(16px, 4vw, 18px)',
            fontWeight: 'bold',
            color: '#000',
            marginBottom: '8px'
          }}>
            Ver Publicaciones
          </Title>
          <Paragraph style={{ 
            fontSize: 'clamp(12px, 3vw, 14px)',
            color: '#000',
            margin: 0
          }}>
            Consulta todas las publicaciones.
          </Paragraph>
        </Card>

        {/* Crear Nuevo Post */}
        <Card 
          style={{ 
            marginBottom: '20px', 
            cursor: 'pointer',
            width: '100%',
            boxSizing: 'border-box'
          }}
          hoverable
          onClick={() => navigate('/create')}
        >
          <Title level={5} style={{ 
            fontSize: 'clamp(16px, 4vw, 18px)',
            fontWeight: 'bold',
            color: '#000',
            marginBottom: '8px'
          }}>
            Crear Nuevo Post
          </Title>
          <Paragraph style={{ 
            fontSize: 'clamp(12px, 3vw, 14px)',
            color: '#000',
            margin: 0
          }}>
            Agrega una nueva publicación.
          </Paragraph>
        </Card>

        {/* Estadísticas */}
        <Card 
          style={{ 
            marginBottom: '20px', 
            cursor: 'pointer',
            width: '100%',
            boxSizing: 'border-box'
          }}
          hoverable
          onClick={() => navigate('/stats')}
        >
          <Title level={5} style={{ 
            fontSize: 'clamp(16px, 4vw, 18px)',
            fontWeight: 'bold',
            color: '#000',
            marginBottom: '8px'
          }}>
            Estadísticas
          </Title>
          <Paragraph style={{ 
            fontSize: 'clamp(12px, 3vw, 14px)',
            color: '#000',
            margin: 0
          }}>
            Analiza la información de tus publicaciones.
          </Paragraph>
        </Card>
      </div>

      {/* Footer Note */}
      <div style={{ 
        textAlign: 'center',
        marginTop: '30px',
        marginBottom: '15px',
        padding: '0 10px'
      }}>
        <Paragraph style={{ 
          margin: 0,
          fontSize: 'clamp(12px, 3vw, 14px)',
          color: '#000'
        }}>
          Recuerda: Cada post debe tener título y contenido.
        </Paragraph>
      </div>

      {/* Copyright */}
      <div style={{ 
        textAlign: 'center',
        marginTop: '15px',
        padding: '0 10px'
      }}>
        <Paragraph style={{ 
          margin: 0,
          fontSize: 'clamp(10px, 2.5vw, 12px)',
          color: '#666'
        }}>
          © 2025 - Sistema de Posts - Taller Académico
        </Paragraph>
      </div>
    </div>
  );
}
