const user = (state = {}, {type, token, data}) => {
  switch (type) {
    case 'LOGIN_SUCCEEDED':
      return {...state, token};
    case 'USER_PROFILE_RECEIVED':
      return {...state, ...data};
    default:
      return state;
  }
};

export default user;