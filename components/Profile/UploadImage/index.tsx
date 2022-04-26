import React, { forwardRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
const UploadImage = forwardRef<HTMLInputElement>(({}, ref) => {
  const queryClient = useQueryClient();

  return <></>;
});
UploadImage.displayName = 'UploadImage';
export default UploadImage;
