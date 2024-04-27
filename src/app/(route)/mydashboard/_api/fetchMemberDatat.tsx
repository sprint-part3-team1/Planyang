import axios from 'axios';

const fetchMemberData = async (page: number, dashboardId: number) => {
  const accessToken = localStorage.getItem('accessToken');
  const response = await axios.get(
    `https://sp-taskify-api.vercel.app/4-1/members?page=${page}&size=4&dashboardId=${dashboardId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

export default fetchMemberData;
