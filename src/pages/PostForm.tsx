import { useEffect, useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Select, 
  message,
  Space
} from 'antd';
import { 
  SaveOutlined, 
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { usePost } from '../context/PostContext';
import type { PostFormData } from '../types';

const { Title } = Typography;
const { TextArea } = Input;

export default function PostForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state, actions } = usePost();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const isEditing = Boolean(id);
  const currentPost = isEditing ? state.posts.find(post => post.id === id) : null;

  useEffect(() => {
    if (isEditing && currentPost) {
      form.setFieldsValue({
        title: currentPost.title,
        content: currentPost.content,
        author: currentPost.author,
        category: currentPost.tags?.[0] || 'Tutorial',
      });
    }
  }, [isEditing, currentPost, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const postData: PostFormData = {
        title: values.title,
        content: values.content,
        author: values.author || 'Usuario',
        status: 'published',
        tags: values.category ? [values.category] : []
      };

      if (isEditing && id) {
        await actions.updatePost(id, postData);
        message.success('Post actualizado exitosamente');
      } else {
        await actions.createPost(postData);
        message.success('Post creado correctamente.');
      }
      
      navigate('/posts');
    } catch (error) {
      message.error('Error al guardar el post');
    } finally {
      setLoading(false);
    }
  };

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
              onClick={() => navigate('/posts')}
            >
              Volver
            </Button>
          </Space>
          <Title level={2} style={{ marginTop: '16px', marginBottom: '24px' }}>
            {isEditing ? 'Editar Publicación' : 'Crear Nueva Publicación'}
          </Title>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
          style={{ maxWidth: '100%' }}
        >
          <Form.Item
            label={<span style={{ fontSize: '16px', fontWeight: '500' }}>Título:</span>}
            name="title"
            rules={[
              { required: true, message: 'El título es obligatorio' },
              { min: 3, message: 'El título debe tener al menos 3 caracteres' }
            ]}
          >
            <Input 
              placeholder="Ingresa el título de la publicación"
              size="large"
              style={{ fontSize: '16px' }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '16px', fontWeight: '500' }}>Autor:</span>}
            name="author"
            rules={[
              { required: true, message: 'El autor es obligatorio' }
            ]}
          >
            <Input 
              placeholder="Nombre del autor"
              size="large"
              style={{ fontSize: '16px' }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '16px', fontWeight: '500' }}>Categoría:</span>}
            name="category"
            rules={[{ required: true, message: 'Selecciona una categoría' }]}
            initialValue="Tutorial"
          >
            <Select size="large" placeholder="Selecciona una categoría">
              <Select.Option value="Tutorial">Tutorial</Select.Option>
              <Select.Option value="Guía">Guía</Select.Option>
              <Select.Option value="Noticia">Noticia</Select.Option>
              <Select.Option value="Tecnología">Tecnología</Select.Option>
              <Select.Option value="Programación">Programación</Select.Option>
              <Select.Option value="Diseño">Diseño</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '16px', fontWeight: '500' }}>Contenido:</span>}
            name="content"
            rules={[
              { required: true, message: 'El contenido es obligatorio' },
              { min: 10, message: 'El contenido debe tener al menos 10 caracteres' }
            ]}
          >
            <TextArea
              rows={8}
              placeholder="Escribe el contenido de la publicación aquí..."
              style={{ fontSize: '16px' }}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: '32px', textAlign: 'center' }}>
            <Space size="large">
              <Button 
                size="large"
                onClick={() => navigate('/posts')}
                style={{ minWidth: '120px' }}
              >
                Cancelar
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                size="large"
                loading={loading}
                icon={<SaveOutlined />}
                style={{ minWidth: '150px' }}
              >
                {isEditing ? 'Actualizar' : 'Crear Post'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
