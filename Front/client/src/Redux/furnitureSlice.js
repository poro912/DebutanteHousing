import { createSlice } from '@reduxjs/toolkit';

const furnitureSlice = createSlice({
  name: 'furniture',
  initialState: {
    furnitureList: [{ id: 0, url: '/glb/drawer/drawer_lightgreen.glb', pos: [-0.1,-0.2,-0], rot: [0, 0, 0] }],
  },
  reducers: {
    addFurniture: (state, action) => {
      state.furnitureList.push(action.payload);
      console.log('Updated furnitureList after adding:', state.furnitureList);
    },
    updateFurniture: (state, action) => {
      const { id, url, pos, rot } = action.payload;
      const furnitureToUpdate = state.furnitureList.find(item => item.id === id);
      if (furnitureToUpdate) {
        furnitureToUpdate.url = url;
        furnitureToUpdate.pos = pos;
        furnitureToUpdate.rot = rot;
      }
    },
    removeFurniture: (state, action) => {
      const idToRemove = action.payload;
      state.furnitureList = state.furnitureList.filter(item => item.id !== idToRemove);
    },
    // 다른 액션들 추가 가능
  },
});

export const { addFurniture, updateFurniture, removeFurniture } = furnitureSlice.actions;
export default furnitureSlice.reducer;
