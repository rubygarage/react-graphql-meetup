export const getAccountId = state => state.profile.data.id;

export const getProfile = state => {
  const { id } = state.profile.data;
  return state.data.profile[id];
};
