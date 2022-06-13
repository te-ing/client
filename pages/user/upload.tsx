import postsApi from 'apis/posts.api';
import Layout from 'components/Layout';
import Editor from 'components/Upload/Editor';
import Register from 'components/Upload/Register';
import useForm from 'hooks/useForm';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { UploadType } from 'types/post';

const Upload: React.FC = () => {
  const [values, setValues, handler] = useForm<UploadType>({ title: '', description: '', images: [] });
  const { mutate: uploadMutate } = useMutation(() => postsApi.uploadPost(values, { isRequiredLogin: true }), {
    onSuccess: ({ data }) => {
      // queryClient.invalidateQueries(['user-profile', data);
      setValues({ title: '', description: '', images: [] });
    },
  });
  useEffect(() => {
    console.log('작품 업로드', values);
  }, [values]);
  return (
    <Layout>
      <Editor values={values} handler={handler} />
      <Register values={values} setValues={setValues} upload={uploadMutate} />
    </Layout>
  );
};

export default Upload;
