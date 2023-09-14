import { createSlice } from '@reduxjs/toolkit';

const furnitureSlice = createSlice({
  name: 'furniture',
  initialState: {
    items: [{ id: 0, name:"closet1_lightgreen", url: "https://gateway.pinata.cloud/ipfs/QmarxKJnbMik44zmFVuGarf8f1u9ZvassbkwBMrUCUzpJx/closet1_lightgreen.glb", pos: [-0.1,-0.2,-0], rot: [0, 0, 0] },
            // { id: 0, url: "https://gateway.pinata.cloud/ipfs/QmarxKJnbMik44zmFVuGarf8f1u9ZvassbkwBMrUCUzpJx/bed1_lightgreen.glb", pos: [-0.1,-0.2,-0], rot: [0, 0, 0] }
          ],
  },
  reducers: {
    addFurniture: (state, action) => {
      state.items.push(action.payload);
      console.log('Updated items after adding:', state.items);
    },
    updateFurniture: (state, action) => {
      const { id, url, pos, rot } = action.payload;
      const furnitureToUpdate = state.items.find(item => item.id === id);
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
      state.items = state.items.filter(item => item.id !== idToRemove);
    },
    // 다른 액션들 추가 가능
  },
});

export const { addFurniture, updateFurniture, removeFurniture } = furnitureSlice.actions;
export default furnitureSlice.reducer;
