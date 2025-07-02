import { useEffect, useState } from 'react';
import { 
  Card, 
  Typography, 
  Button,
  Space,
  InputNumber,
  Divider
} from 'antd';
import { 
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { usePost } from '../context/PostContext';

const { Title, Text } = Typography;

export default function Statistics() {
  const navigate = useNavigate();
  const { state, actions } = usePost();
  const [minLength, setMinLength] = useState(1);

  useEffect(() => {
    if (state.posts.length === 0) {
      actions.fetchPosts();
    }
  }, [state.posts.length]);

  // Calcular estadísticas
  const posts = state.posts.length > 0 ? state.posts : [
    {
      id: '1',
      title: 'Guía',
      content: 'Contenido de ejemplo 1',
      author: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['Tutorial'],
      status: 'published',
    },
    {
      id: '2',
      title: 'Tutorial',
      content: 'Contenido de ejemplo 2',
      author: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['Tutorial'],
      status: 'published',
    },
    {
      id: '3',
      title: 'Manual completo',
      content: 'Contenido de ejemplo 3',
      author: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['Guía'],
      status: 'published',
    }
  ];

  // 1. Contar posts con títulos largos
  const postsWithLongTitles = posts.filter(post => post.title.length >= minLength);

  // 2. Porcentaje por categoría
  const categories: { [key: string]: number } = {};
  posts.forEach(post => {
    const category = post.tags?.[0] || 'Sin categoría';
    categories[category] = (categories[category] || 0) + 1;
  });

  const categoryPercentages = Object.entries(categories).map(([category, count]) => ({
    category,
    count,
    percentage: ((count / posts.length) * 100).toFixed(2)
  }));

  // 3. Total de caracteres en títulos
  const totalCharactersInTitles = posts.reduce((sum, post) => sum + post.title.length, 0);

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
            Estadísticas de Publicaciones
          </Title>
        </div>

        {/* 1. Contar Posts con Títulos Largos */}
        <div style={{ marginBottom: '32px' }}>
          <Title level={4} style={{ marginBottom: '16px' }}>
            1. Contar Posts con Títulos Largos
          </Title>
          
          <div style={{ marginBottom: '16px' }}>
            <Text style={{ fontSize: '16px', marginRight: '12px' }}>
              Longitud mínima de título:
            </Text>
            <InputNumber 
              min={1} 
              value={minLength} 
              onChange={(value) => setMinLength(value || 1)}
              style={{ width: '80px' }}
            />
          </div>
          
          <Text style={{ fontSize: '16px' }}>
            Total de posts con título ≥ {minLength} caracteres: <strong>{postsWithLongTitles.length}</strong>
          </Text>
        </div>

        <Divider />

        {/* 2. Porcentaje de Posts por Categoría */}
        <div style={{ marginBottom: '32px' }}>
          <Title level={4} style={{ marginBottom: '16px' }}>
            2. Porcentaje de Posts por Categoría
          </Title>
          
          {categoryPercentages.map(({ category, percentage }) => (
            <div key={category} style={{ marginBottom: '16px' }}>
              <div style={{ 
                backgroundColor: '#f0f0f0', 
                padding: '12px', 
                borderRadius: '6px',
                border: '1px solid #d9d9d9'
              }}>
                <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  {category}
                </Text>
                <br />
                <Text style={{ fontSize: '16px' }}>
                  Porcentaje de "{category}": <strong>{percentage}%</strong>
                </Text>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* 3. Total de Caracteres en Títulos */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={4} style={{ marginBottom: '16px' }}>
            3. Total de Caracteres en Títulos
          </Title>
          
          <Text style={{ fontSize: '16px' }}>
            Total de caracteres en todos los títulos: <strong>{totalCharactersInTitles}</strong>
          </Text>
        </div>
      </Card>
    </div>
  );
}
