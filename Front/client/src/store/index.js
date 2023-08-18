import { proxy } from "valtio";

const state = proxy({
    intro : true,
    color : '#EFBD48',
    isLogoTexture : false,
    isFullTexture : false,
    logoDecal : './threejs.png',
    fullDecal : './DuckCM.png',
    pink : [['/glb/chair/chair1_green.glb',[0.12,-0.2,-0.14]],['/glb/drawer/drawer_lightgreen.glb', [-0.12,-0.2,-0.14]],
            ['/glb/table/table_lightgreen.glb',[-0.00,-0.2,-0.0]]],
    green : [['/glb/chair/chair1_pink.glb',[0.12,-0.2,-0.14]],['/glb/drawer/drawer_pink.glb', [-0.12,-0.2,-0.14]],
            ['/glb/table/table_pink.glb',[-0.00,-0.2,-0.0]]],
    morden : [['/glb/chair/chair1_modern.glb',[0.12,-0.2,-0.14]],['/glb/drawer/drawer_modern.glb', [-0.12,-0.2,-0.14]],
            ['/glb/table/table_modern.glb',[-0.00,-0.2,-0.0]]],
    wood : [['/glb/chair/chair1_wood.glb',[0.12,-0.2,-0.14]],['/glb/drawer/drawer_wood.glb', [-0.12,-0.2,-0.14]],
            ['/glb/table/table_wood.glb',[-0.00,-0.2,-0.0]]],
    purple : [['/glb/chair/chair1_purple.glb',[0.12,-0.2,-0.14]],['/glb/drawer/drawer_purple.glb', [-0.12,-0.2,-0.14]],
            ['/glb/table/table_purple.glb',[-0.00,-0.2,-0.0]]],
    url2 : [["candlestick_lowpoly_final.obj", "candlestick_lowpoly_final.mtl", [-12,-3,0], [0, 1.55, 0]], ["closet_final.obj", "closet_final.mtl", [12,-20,-14], [0, 0, 0]]
    , ["sm_desk_final.obj", "sm_desk_final.mtl", [-11,25,5], [0, 1.55, 0]], ["jewelbox_lowpoly1.obj", "jewelbox_lowpoly1.mtl", [-10,-2,12], [0, 1.55, 0]]],
    url3 : [['/glb/table/table_lightgreen.glb',[-0.0,-0.2,-0.0]], ['/glb/chair/chair1_pink.glb',[-0.00,-0.2,-0.14]]],
    click : 0,
    obj : false
});

export default state;