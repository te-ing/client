import usersApi from 'apis/users.api';
import Layout from 'components/Layout';
import UserPost from 'components/Posts/UserPost';
import { GetStaticPropsContext } from 'next';
import { PostType } from 'types/post';

export const Posts = ({ posts }: { posts: PostType[] }) => {
  return (
    <Layout>
      {posts.slice(0, 1).map((post: PostType) => {
        return <UserPost key={post.id} post={post}></UserPost>;
      })}
    </Layout>
  );
};

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  try {
    const id = context.params?.id as string;
    const posts = await usersApi.getUserPosts(id);
    return {
      props: {
        posts: posts,
      },
    };
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default Posts;
