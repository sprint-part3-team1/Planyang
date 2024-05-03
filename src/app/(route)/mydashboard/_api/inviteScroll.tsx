import axios from 'axios';

const fetchInviteData = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await axios.get(
    `https://sp-taskify-api.vercel.app/4-1/invitations?size=5`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

export { fetchInviteData };

const fetchInviteDataCursor = async (cursorId: number) => {
  const accessToken = localStorage.getItem('accessToken');

  const response = await axios.get(
    `https://sp-taskify-api.vercel.app/4-1/invitations?cursorId=${cursorId}&size=5`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

export { fetchInviteDataCursor };
