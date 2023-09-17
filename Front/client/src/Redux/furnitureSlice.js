import { createSlice } from '@reduxjs/toolkit';

const furnitureSlice = createSlice({
  name: 'furniture',
  initialState: {
    items: [],
  },
  reducers: {
    addFurniture: (state, action) => {
      state.items.push(action.payload);
      console.log('Updated items after adding:', state.items);
    },
    updateFurniture: (state, action) => {
      const { code, url, pos, rot } = action.payload;
      const furnitureToUpdate = state.items.find(item => item.code === code);
      if (furnitureToUpdate) {
        furnitureToUpdate.url = url;
        furnitureToUpdate.pos = pos;
        furnitureToUpdate.rot = rot;
      }
      console.log('Updated items after adding:', state.items.map(item => ({
        ...item,
        pos: { ...item.pos },
        rot: { ...item.rot }
      })));
      
    },
    removeFurniture: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter(item => item.code !== idToRemove);
    },
    setFurniture: (state, action) => {
      state.items = action.payload; // 새로운 배열을 할당하여 items를 업데이트
    },
    resetFurniture: (state) => {
      state.items = []; // items 배열을 빈 배열로 재설정
    },
    // 다른 액션들 추가 가능
  },
});

export const { setFurniture, addFurniture, updateFurniture, removeFurniture, resetFurniture } = furnitureSlice.actions;
export default furnitureSlice.reducer;
