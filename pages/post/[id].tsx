import postsApi from 'apis/posts.api';
import Layout from 'components/Layout';
import UserPostContent from 'components/Posts/UserPost/UserPostContent';
import UserPostHeader from 'components/Posts/UserPost/UserPostHeader';
import { GetStaticPropsContext } from 'next';
import { PostType } from 'types/post';

export const Post = ({ post }: { post: PostType }) => {
  return (
    <Layout>
      <UserPostHeader post={post} />
      <UserPostContent post={post} />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  try {
    const id = context.params?.id as string;
    const post = await postsApi.getPost(id);
    return {
      props: {
        post: post,
      },
    };
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default Post;
