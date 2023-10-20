import { createSlice } from '@reduxjs/toolkit';
import state from '../store';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    user_code: null,
    user_id: null,
    user_nick: null,
    user_profile: null,
    room_code: null,
    room_name : null,
    room_like: null,
    account : null,
    privateKey : null,
    token_amount : null,
    //eth_amount : null,
    isLoggedIn: false,
    room_color: null,
  },
  reducers: {
    setLogout: (state) => {
      state.user_code = null;
      state.user_id = null;
      state.user_nick = null;
      state.user_profile = null;
      state.room_code = null;
      state.room_name = null;
      state.room_like = null;
      state.account = null;
      state.privateKey = null;
      state.token_amount = null;
      //state.eth_amount = null;
      state.isLoggedIn = false;
      console.log('실제 상태:', state.user_id, state.user_nick, state.user_code, state.token_amount, state.eth_amount, state.isLoggedIn);
    },
    setLogin: (state, action) => {
      const { user_code, user_id, user_nick, user_profile, room_code, room_name, room_like, account, privateKey, room_color} = action.payload;
      state.room_code = room_code;
      state.room_like = room_like;
      state.room_name = room_name;
      state.user_code = user_code;
      state.user_id = user_id;
      state.user_nick = user_nick;
      state.user_profile = user_profile;
      state.account = account;
      state.privateKey = privateKey;
      state.room_color = room_color;
      //state.token_amount = token_amount;
      //state.eth_amount = eth_amount;
      state.isLoggedIn = true;
      console.log('실제 상태:', state.user_code, state.user_id, state.user_nick, state.room_code, state.room_name, state.account, state.privateKey, state.isLoggedIn, state.room_color, state.room_like); // 실제 상태 출력 '_' 프로퍼티는 프록시 객체의 실제 상태를 나타내는 프로퍼티
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
    setRoomColor: (state, action) => {
      state.room_color = action.payload;
      console.log('방 색깔', state.room_color)
    },
    setRoomLike: (state, action) => {
      state.room_like = action.payload;
      console.log('방 좋아요', state.room_like)
    }
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
  setRoomColor,
  setRoomLike,
} = userSlice.actions;

export default userSlice.reducer;