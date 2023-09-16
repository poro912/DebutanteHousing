import { createSlice } from '@reduxjs/toolkit';

const furnitureSlice = createSlice({
  name: 'furniture',
  initialState: {
    items: [{ code: 402, name: "closet1_lightgreen", url: "https://gateway.pinata.cloud/ipfs/QmarxKJnbMik44zmFVuGarf8f1u9ZvassbkwBMrUCUzpJx/closet1_lightgreen.glb", pos: [-0.1,-0.2,-0], rot: [0, 1, 0] }, 
          ],
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
    // 다른 액션들 추가 가능
  },
});

export const { setFurniture, addFurniture, updateFurniture, removeFurniture } = furnitureSlice.actions;
export default furnitureSlice.reducer;
