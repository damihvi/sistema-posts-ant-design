import { useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Typography, 
  Progress,
  List,
  Tag,
  Button,
  Space
} from 'antd';
import { 
  FileTextOutlined,
  CheckCircleOutlined,
  EditOutlined,
  InboxOutlined,
  BarChartOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { usePost } from '../context/PostContext';

const { Title } = Typography;

export default function Statistics() {
  const navigate = useNavigate();
  const { state, actions } = usePost();

  useEffect(() => {
    if (state.posts.length === 0) {
      actions.fetchPosts();
    }
    actions.fetchStats();
  }, [state.posts.length]);

  const { stats } = state;

  if (!stats) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Card>
          <Title level={3}>Cargando estadísticas...</Title>
        </Card>
      </div>
    );
  }

  const publishedPercentage = stats.total > 0 ? (stats.published / stats.total) * 100 : 0;
  const draftPercentage = stats.total > 0 ? (stats.drafts / stats.total) * 100 : 0;

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Space>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </Button>
        </Space>
        <Title level={2} style={{ marginTop: '16px' }}>
          📊 Estadísticas
        </Title>
        <Typography.Paragraph style={{ fontSize: '16px', color: '#666' }}>
          Analiza la información de tus publicaciones
        </Typography.Paragraph>
      </div>

      {/* Estadísticas principales */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total de Posts"
              value={stats.total}
              prefix={<FileTextOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Publicados"
              value={stats.published}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Borradores"
              value={stats.drafts}
              prefix={<EditOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Archivados"
              value={stats.archived}
              prefix={<InboxOutlined style={{ color: '#f5222d' }} />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Distribución por estado */}
        <Col xs={24} lg={12}>
          <Card title="📈 Distribución por Estado" extra={<BarChartOutlined />}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Publicados</span>
                <span style={{ color: '#52c41a', fontWeight: 'bold' }}>
                  {stats.published} ({publishedPercentage.toFixed(1)}%)
                </span>
              </div>
              <Progress 
                percent={publishedPercentage} 
                strokeColor="#52c41a"
                showInfo={false}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Borradores</span>
                <span style={{ color: '#fa8c16', fontWeight: 'bold' }}>
                  {stats.drafts} ({draftPercentage.toFixed(1)}%)
                </span>
              </div>
              <Progress 
                percent={draftPercentage} 
                strokeColor="#fa8c16"
                showInfo={false}
              />
            </div>

            {stats.archived > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Archivados</span>
                  <span style={{ color: '#f5222d', fontWeight: 'bold' }}>
                    {stats.archived} ({((stats.archived / stats.total) * 100).toFixed(1)}%)
                  </span>
                </div>
                <Progress 
                  percent={(stats.archived / stats.total) * 100} 
                  strokeColor="#f5222d"
                  showInfo={false}
                />
              </div>
            )}
          </Card>
        </Col>

        {/* Información adicional */}
        <Col xs={24} lg={12}>
          <Card title="📝 Información Adicional">
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Longitud promedio de contenido:</span>
                <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
                  {Math.round(stats.averageLength)} caracteres
                </span>
              </div>
            </div>

            {stats.total > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Productividad:</span>
                  <Tag color={publishedPercentage >= 70 ? 'green' : publishedPercentage >= 40 ? 'orange' : 'red'}>
                    {publishedPercentage >= 70 ? 'Excelente' : 
                     publishedPercentage >= 40 ? 'Buena' : 'Necesita mejora'}
                  </Tag>
                </div>
              </div>
            )}

            <div>
              <Button 
                type="primary" 
                block 
                onClick={() => navigate('/create')}
                style={{ marginTop: '8px' }}
              >
                Crear Nuevo Post
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Tags más populares */}
      {stats.mostPopularTags.length > 0 && (
        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          <Col span={24}>
            <Card title="🏷️ Tags Más Populares">
              <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                dataSource={stats.mostPopularTags}
                renderItem={(item) => (
                  <List.Item>
                    <Card size="small" style={{ textAlign: 'center' }}>
                      <Tag 
                        color="blue" 
                        style={{ 
                          marginBottom: '8px',
                          fontSize: '14px',
                          padding: '4px 8px'
                        }}
                      >
                        {item.tag}
                      </Tag>
                      <div style={{ color: '#666', fontSize: '12px' }}>
                        {item.count} {item.count === 1 ? 'post' : 'posts'}
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Recomendaciones */}
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="💡 Recomendaciones" style={{ background: '#f6ffed', borderColor: '#b7eb8f' }}>
            <List size="small">
              {publishedPercentage < 50 && (
                <List.Item>
                  📝 Considera publicar más de tus borradores para aumentar tu contenido visible
                </List.Item>
              )}
              {stats.averageLength < 100 && (
                <List.Item>
                  📚 Trata de escribir contenido más detallado para brindar mayor valor a tus lectores
                </List.Item>
              )}
              {stats.mostPopularTags.length === 0 && (
                <List.Item>
                  🏷️ Agrega tags a tus posts para mejorar la organización y búsqueda
                </List.Item>
              )}
              {stats.total < 5 && (
                <List.Item>
                  🚀 ¡Sigue creando contenido! Tienes un buen comienzo, continúa escribiendo más posts
                </List.Item>
              )}
            </List>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
