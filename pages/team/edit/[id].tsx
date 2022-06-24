import postsApi from 'apis/posts.api';
import Layout from 'components/Layout';
import Editor from 'components/Upload/Editor';
import Register from 'components/Upload/Register';
import useForm from 'hooks/useForm';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { dehydrate, QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { TeamUploadType } from 'types/post';

const Edit: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;
  const [values, setValues, handler] = useForm<TeamUploadType>({ team: -1, title: '', description: '', images: [] });
  const { data, isLoading, isError } = useQuery(['user-post-edit', id], () => postsApi.getPost(id), {
    select: (data) => {
      console.log('에딧', data);
      const format = { team: data.id, title: data.title, description: data.description, images: [...data.images] };
      return format;
    },
    onSuccess: (data) => {
      console.log('성공', data);
      setValues({ ...data, images: data.images.map((img) => img.image) });
    },
  });
  const { mutate: uploadMutate } = useMutation(() => postsApi.uploadPost(values, { isRequiredLogin: true }), {
    onSuccess: ({ data }) => {
      // queryClient.invalidateQueries(['user-profile', data);
      // setValues({ title: '', description: '', images: [] });
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

// export const getServerSideProps = async (context: GetStaticPropsContext) => {
//   try {
//     const queryClient = new QueryClient();
//     const id = context.params?.id as string;

//     await queryClient.prefetchQuery(['user-post-edit', id], ({ queryKey }) => postsApi.getPost(Number(queryKey[1])));

//     return {
//       props: {
//         dehydratedState: dehydrate(queryClient),
//       },
//     };
//   } catch (err) {
//     console.error(err);
//     return err;
//   }
// };
export default Edit;
