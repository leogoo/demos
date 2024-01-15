'use client'

import React, { FC, useEffect } from 'react';

interface IProps {
  params: { id: string }
}
const Index: FC<IProps> = ({ params }) => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://127.0.0.1:3000/api');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      id: {params?.id}
    </div>
  );
};
export default Index;
