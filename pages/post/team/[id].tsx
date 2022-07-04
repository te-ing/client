import teamPostsApi from 'apis/teamPosts.api';
import Layout from 'components/Layout';
import TeamPostContent from 'components/Posts/TeamPost/TeamPostContent';
import TeamPostHeader from 'components/Posts/TeamPost/TeamPostHeader';
import { GetStaticPropsContext } from 'next';
import { TeamPostType } from 'types/post';

export const TeamPost = ({ post }: { post: TeamPostType }) => {
  return (
    <Layout>
      <TeamPostHeader post={post} />
      <TeamPostContent post={post} />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetStaticPropsContext) => {
  try {
    const id = context.params?.id as string;
    const post = await teamPostsApi.getTeamPost(id);
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

export default TeamPost;
