import { useEffect, useState } from 'react';
import { 
  Card, 
  List, 
  Tag, 
  Button, 
  Typography, 
  Space, 
  Modal, 
  message,
  Spin,
  Empty,
  Tooltip,
  Input,
  Select,
  Row,
  Col,
  Divider
} from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  CalendarOutlined,
  UserOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { usePost } from '../context/PostContext';
import type { Post } from '../types';
import dayjs from 'dayjs';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

export default function PostList() {
  const navigate = useNavigate();
  const { state, actions } = usePost();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [authorFilter, setAuthorFilter] = useState<string>('all');

  useEffect(() => {
    actions.fetchPosts();
  }, []);

  // Filtrar posts basado en búsqueda y filtros
  const filteredPosts = state.posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesAuthor = authorFilter === 'all' || post.author === authorFilter;
    
    return matchesSearch && matchesStatus && matchesAuthor;
  });

  // Obtener lista única de autores para el filtro
  const uniqueAuthors = [...new Set(state.posts.map(post => post.author))];

  const handleView = (post: Post) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  const handleEdit = (post: Post) => {
    navigate(`/edit/${post.id}`);
  };

  const handleDelete = async (post: Post) => {
    Modal.confirm({
      title: '¿Estás seguro?',
      content: `¿Deseas eliminar el post "${post.title}"?`,
      okText: 'Sí, eliminar',
      cancelText: 'Cancelar',
      okType: 'danger',
      onOk: async () => {
        try {
          await actions.deletePost(post.id);
          message.success('Post eliminado exitosamente');
        } catch (error) {
          message.error('Error al eliminar el post');
        }
      },
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      published: 'green',
      draft: 'orange',
      archived: 'red'
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts = {
      published: 'Publicado',
      draft: 'Borrador',
      archived: 'Archivado'
    };
    return texts[status as keyof typeof texts] || status;
  };

  if (state.loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <div style={{ marginTop: '16px' }}>
          <Text>Cargando publicaciones...</Text>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Header con búsqueda y filtros */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} lg={12}>
            <Title level={2} style={{ margin: 0 }}>
              📄 Gestión de Publicaciones
            </Title>
          </Col>
          <Col xs={24} lg={12} style={{ textAlign: 'right' }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => navigate('/create')}
              size="large"
            >
              Crear Nuevo Post
            </Button>
          </Col>
        </Row>
        
        <Divider />
        
        {/* Búsqueda y filtros */}
        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col xs={24} md={8}>
            <Search
              placeholder="Buscar en posts..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs={12} md={8}>
            <Select
              placeholder="Filtrar por estado"
              style={{ width: '100%' }}
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Select.Option value="all">Todos los estados</Select.Option>
              <Select.Option value="published">Publicados</Select.Option>
              <Select.Option value="draft">Borradores</Select.Option>
              <Select.Option value="archived">Archivados</Select.Option>
            </Select>
          </Col>
          <Col xs={12} md={8}>
            <Select
              placeholder="Filtrar por autor"
              style={{ width: '100%' }}
              size="large"
              value={authorFilter}
              onChange={setAuthorFilter}
            >
              <Select.Option value="all">Todos los autores</Select.Option>
              {uniqueAuthors.map(author => (
                <Select.Option key={author} value={author}>
                  {author}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>

        {/* Estadísticas de filtros */}
        <div style={{ marginTop: '16px', padding: '12px', background: '#f8f9fa', borderRadius: '6px' }}>
          <Text type="secondary">
            Mostrando {filteredPosts.length} de {state.posts.length} publicaciones
            {searchTerm && ` • Búsqueda: "${searchTerm}"`}
            {statusFilter !== 'all' && ` • Estado: ${getStatusText(statusFilter)}`}
            {authorFilter !== 'all' && ` • Autor: ${authorFilter}`}
          </Text>
        </div>
      </Card>

      {filteredPosts.length === 0 ? (
        <Card>
          <Empty
            description={searchTerm || statusFilter !== 'all' || authorFilter !== 'all' 
              ? "No se encontraron publicaciones con los filtros aplicados" 
              : "No hay publicaciones disponibles"
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            {!searchTerm && statusFilter === 'all' && authorFilter === 'all' && (
              <Button type="primary" onClick={() => navigate('/create')}>
                Crear tu primer post
              </Button>
            )}
            {(searchTerm || statusFilter !== 'all' || authorFilter !== 'all') && (
              <Space direction="vertical">
                <Button onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setAuthorFilter('all');
                }}>
                  Limpiar filtros
                </Button>
                <Button type="primary" onClick={() => navigate('/create')}>
                  Crear nuevo post
                </Button>
              </Space>
            )}
          </Empty>
        </Card>
      ) : (
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
          dataSource={filteredPosts}
          renderItem={(post) => (
            <List.Item>
              <Card
                hoverable
                actions={[
                  <Tooltip title="Ver post">
                    <Button 
                      type="text" 
                      icon={<EyeOutlined />} 
                      onClick={() => handleView(post)}
                    />
                  </Tooltip>,
                  <Tooltip title="Editar post">
                    <Button 
                      type="text" 
                      icon={<EditOutlined />} 
                      onClick={() => handleEdit(post)}
                    />
                  </Tooltip>,
                  <Tooltip title="Eliminar post">
                    <Button 
                      type="text" 
                      danger 
                      icon={<DeleteOutlined />} 
                      onClick={() => handleDelete(post)}
                    />
                  </Tooltip>
                ]}
                style={{ height: '100%' }}
              >
                <Card.Meta
                  title={
                    <div style={{ marginBottom: '8px' }}>
                      <Text strong style={{ fontSize: '16px' }}>
                        {post.title}
                      </Text>
                      <div style={{ marginTop: '4px' }}>
                        <Tag color={getStatusColor(post.status)}>
                          {getStatusText(post.status)}
                        </Tag>
                      </div>
                    </div>
                  }
                  description={
                    <div>
                      <Paragraph 
                        ellipsis={{ rows: 3 }}
                        style={{ marginBottom: '12px', color: '#666' }}
                      >
                        {post.content}
                      </Paragraph>
                      
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <UserOutlined style={{ color: '#666', fontSize: '12px' }} />
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {post.author}
                          </Text>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CalendarOutlined style={{ color: '#666', fontSize: '12px' }} />
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {dayjs(post.createdAt).format('DD/MM/YYYY')}
                          </Text>
                        </div>

                        {post.tags && post.tags.length > 0 && (
                          <div style={{ marginTop: '8px' }}>
                            {post.tags.map(tag => (
                              <Tag key={tag} style={{ marginBottom: '2px', fontSize: '12px' }}>
                                {tag}
                              </Tag>
                            ))}
                          </div>
                        )}
                      </Space>
                    </div>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      )}

      {/* Modal para ver post completo */}
      <Modal
        title={selectedPost?.title}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Cerrar
          </Button>,
          <Button 
            key="edit" 
            type="primary" 
            onClick={() => {
              setIsModalVisible(false);
              if (selectedPost) handleEdit(selectedPost);
            }}
          >
            Editar
          </Button>
        ]}
        width={800}
      >
        {selectedPost && (
          <div>
            <Space direction="vertical" size="middle" style={{ width: '100%', marginBottom: '16px' }}>
              <div>
                <Text strong>Autor: </Text>
                <Text>{selectedPost.author}</Text>
              </div>
              <div>
                <Text strong>Estado: </Text>
                <Tag color={getStatusColor(selectedPost.status)}>
                  {getStatusText(selectedPost.status)}
                </Tag>
              </div>
              <div>
                <Text strong>Fecha de creación: </Text>
                <Text>{dayjs(selectedPost.createdAt).format('DD/MM/YYYY HH:mm')}</Text>
              </div>
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div>
                  <Text strong>Tags: </Text>
                  {selectedPost.tags.map(tag => (
                    <Tag key={tag} style={{ marginLeft: '4px' }}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}
            </Space>
            
            <div style={{ border: '1px solid #f0f0f0', padding: '16px', borderRadius: '6px' }}>
              <Text strong style={{ display: 'block', marginBottom: '8px' }}>Contenido:</Text>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {selectedPost.content}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
