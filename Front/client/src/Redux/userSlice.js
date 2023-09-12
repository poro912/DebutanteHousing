import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    room_code:null,
    room_like: null,
    room_name: '',
    user_code: null,
    user_id: '',
    user_nick : '',
    user_profile: null,
    //token_amount : null,
    //eth_amount : null,
    isLoggedIn: false,
  },
  reducers: {
    setLogout: (state) => {
      state.room_code = null;
      state.room_like = null;
      state.room_name = '';
      state.user_code = null;
      state.user_id = '';
      state.user_nick = '';
      state.user_profile = null;
      //state.token_amount = null;
      //state.eth_amount = null;
      state.isLoggedIn = false;
      console.log('실제 상태:', state.user_id, state.user_nick, state.user_code, state.token_amount, state.eth_amount, state.isLoggedIn);
    },
    setLogin: (state, action) => {
      const { room_code, room_like, room_name, user_code, user_id, user_nick, user_profile, token_amount, eth_amount } = action.payload;
      state.room_code = room_code;
      state.room_like = room_like;
      state.room_name = room_name;
      state.user_code = user_code;
      state.user_id = user_id;
      state.user_nick = user_nick;
      state.user_profile = user_profile;
      //state.token_amount = token_amount;
      //state.eth_amount = eth_amount;
      state.isLoggedIn = true;
      console.log('실제 상태:', state.user_id, state.user_nick, state.room_code, state.room_name, state.user_profile, state.isLoggedIn); // 실제 상태 출력 '_' 프로퍼티는 프록시 객체의 실제 상태를 나타내는 프로퍼티
    },
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setTokenAmount: (state, action) => {
      state.token_amount = action.payload;
      console.log('토큰잔액', state.token_amount)
    },
    setEthAmount: (state, action) => {
      state.eth_amount = action.payload;
      console.log('이더 잔액', state.eth_amount)
    },
    setProfileImg: (state, action) => {
      state.profileImg = action.payload;
      //console.log('프로필 이미지 :', state.profileImg)
    },
  },
});

export const {
  setLogout,
  setLogin,
  setNickname,
  setAddress,
  setTokenAmount,
  setEthAmount,
  setProfileImg,
} = userSlice.actions;

export default userSlice.reducer;