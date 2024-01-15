import React, { FC } from 'react';

interface IProps {
  params: { slug: string[] }
}
const Index: FC<IProps> = ({ params }) => {
  console.log(params)
  return (
    <div>
      slug: {params?.slug}
    </div>
  );
};
export default Index;
