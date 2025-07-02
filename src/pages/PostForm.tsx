import { useEffect, useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Select, 
  message,
  Space,
  Divider,
  Tag
} from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
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
  const [tags, setTags] = useState<string[]>([]);

  const isEditing = Boolean(id);
  const currentPost = isEditing ? state.posts.find(post => post.id === id) : null;

  useEffect(() => {
    if (isEditing && currentPost) {
      form.setFieldsValue({
        title: currentPost.title,
        content: currentPost.content,
        author: currentPost.author,
        status: currentPost.status,
      });
      setTags(currentPost.tags || []);
    }
  }, [isEditing, currentPost, form]);

  const handleSubmit = async (values: PostFormData) => {
    setLoading(true);
    try {
      const postData = {
        ...values,
        tags: tags.length > 0 ? tags : undefined,
      };

      if (isEditing && id) {
        await actions.updatePost(id, postData);
        message.success('Post actualizado exitosamente');
      } else {
        await actions.createPost(postData);
        message.success('Post creado exitosamente');
      }
      
      navigate('/posts');
    } catch (error) {
      message.error('Error al guardar el post');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const commonTags = [
    'tecnología', 'programación', 'react', 'javascript', 'tutorial', 
    'guía', 'tips', 'desarrollo', 'web', 'móvil', 'diseño', 'ux/ui'
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/posts')}
            >
              Volver
            </Button>
          </Space>
          <Title level={2} style={{ marginTop: '16px' }}>
            {isEditing ? '✏️ Editar Post' : '➕ Crear Nuevo Post'}
          </Title>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            label="Título"
            name="title"
            rules={[
              { required: true, message: 'El título es obligatorio' },
              { min: 5, message: 'El título debe tener al menos 5 caracteres' },
              { max: 100, message: 'El título no puede exceder 100 caracteres' }
            ]}
          >
            <Input 
              placeholder="Ingresa el título del post"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Autor"
            name="author"
            rules={[
              { required: true, message: 'El autor es obligatorio' },
              { min: 2, message: 'El nombre del autor debe tener al menos 2 caracteres' }
            ]}
          >
            <Input 
              placeholder="Nombre del autor"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Estado"
            name="status"
            rules={[{ required: true, message: 'Selecciona el estado del post' }]}
            initialValue="draft"
          >
            <Select size="large" placeholder="Selecciona el estado">
              <Select.Option value="draft">📝 Borrador</Select.Option>
              <Select.Option value="published">✅ Publicado</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Tags">
            <div style={{ marginBottom: '8px' }}>
              <Select
                placeholder="Selecciona o escribe tags"
                style={{ width: '100%' }}
                onSelect={(value: string | undefined) => value && handleAddTag(value)}
                value={undefined}
                size="large"
                showSearch
                allowClear
              >
                {commonTags
                  .filter(tag => !tags.includes(tag))
                  .map(tag => (
                    <Select.Option key={tag} value={tag}>
                      {tag}
                    </Select.Option>
                  ))
                }
              </Select>
            </div>
            {tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {tags.map(tag => (
                  <Tag
                    key={tag}
                    closable
                    onClose={() => handleRemoveTag(tag)}
                    style={{ 
                      borderRadius: '16px',
                      marginBottom: '4px'
                    }}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </Form.Item>

          <Form.Item
            label="Contenido"
            name="content"
            rules={[
              { required: true, message: 'El contenido es obligatorio' },
              { min: 10, message: 'El contenido debe tener al menos 10 caracteres' }
            ]}
          >
            <TextArea
              rows={12}
              placeholder="Escribe el contenido del post aquí..."
              showCount
              maxLength={5000}
            />
          </Form.Item>

          <Divider />

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button 
                size="large"
                onClick={() => navigate('/posts')}
              >
                Cancelar
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                size="large"
                loading={loading}
                icon={<SaveOutlined />}
              >
                {isEditing ? 'Actualizar Post' : 'Crear Post'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card style={{ marginTop: '16px' }}>
        <Typography.Paragraph type="secondary" style={{ margin: 0, fontSize: '12px' }}>
          💡 <strong>Tip:</strong> Recuerda que cada post debe tener título y contenido. 
          Los tags te ayudarán a organizar mejor tus publicaciones.
        </Typography.Paragraph>
      </Card>
    </div>
  );
}
