import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import furnitureSlice from './furnitureSlice';

export default configureStore({
  reducer: {
    users: userSlice,
    furniture : furnitureSlice,
    // 다른 상태 슬라이스들도 추가할 수 있습니다.
  },
});
