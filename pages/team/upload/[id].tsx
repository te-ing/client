import postsApi from 'apis/posts.api';
import teamPostsApi from 'apis/teamPosts.api';
import Layout from 'components/Layout';
import Editor from 'components/Upload/Editor';
import Register from 'components/Upload/Register';
import useForm from 'hooks/useForm';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { TeamUploadType } from 'types/post';

const Upload: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [values, setValues, handler] = useForm<TeamUploadType>({
    team: Number(id),
    title: '',
    description: '',
    images: [],
  });
  const { mutate: uploadMutate } = useMutation(() => teamPostsApi.uploadTeamPost(values, { isRequiredLogin: true }), {
    onSuccess: ({ data }) => {
      // queryClient.invalidateQueries(['user-profile', data);
      setValues({ team: Number(id), title: '', description: '', images: [] });
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
