import teamPostsApi from 'apis/teamPosts.api';
import Layout from 'components/Layout';
import Editor from 'components/Upload/Editor';
import Register from 'components/Upload/Register';
import useForm from 'hooks/useForm';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

import { dehydrate, QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { TeamUploadType } from 'types/post';

interface selectType {
  title: string;
  description: string;
  images: string[];
  team: number;
}

const Edit: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [values, setValues, handler] = useForm<TeamUploadType>({ team: -1, title: '', description: '', images: [] });
  const { data, isLoading, isError } = useQuery(['team-post-edit', id], () => teamPostsApi.getTeamPost(id), {
    refetchOnWindowFocus: false,
    select: (data): selectType => {
      const format = {
        team: data.team,
        title: data.title,
        description: data.description,
        images: data.images.map((img) => img.image),
      };
      return format;
    },
    onSuccess: (data: selectType) => {
      setValues({ ...data });
    },
  });
  const { mutate: uploadMutate } = useMutation(
    () => teamPostsApi.editTeamPost(Number(id), values, { isRequiredLogin: true }),
    {
      onSuccess: ({ data }) => {
        alert('작품 수정에 성공하였습니다!');
        router.back();
      },
    }
  );

  return (
    <Layout>
      <Editor values={values} handler={handler} />
      <Register values={values} setValues={setValues} upload={uploadMutate} />
    </Layout>
  );
};

export default Edit;

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  try {
    const queryClient = new QueryClient();
    const id = context.params?.id as string;

    await queryClient.prefetchQuery(['team-post-edit', id], ({ queryKey }) =>
      teamPostsApi.getTeamPost(Number(queryKey[1]))
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (err) {
    console.error(err);
    return err;
  }
};
