import axios from 'axios';

const fetchDashboards = async (page: number, size: number) => {
  const accessToken = localStorage.getItem('accessToken');
  const response = await axios.get(
    `https://sp-taskify-api.vercel.app/4-1/dashboards?navigationMethod=pagination&page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

export default fetchDashboards;
