import React from 'react';

import Layout from 'components/Layout';
import Editor from 'components/Upload/Editor';
import Register from 'components/Upload/Register';

const Upload: React.FC = () => {
  return (
    <Layout>
      <Editor />
      <Register />
    </Layout>
  );
};

export default Upload;
