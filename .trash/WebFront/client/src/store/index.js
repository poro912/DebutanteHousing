import { proxy } from "valtio";

const state = proxy({
    intro : true,
    color : '#EFBD48',
    isLogoTexture : false,
    isFullTexture : false,
    logoDecal : './threejs.png',
    fullDecal : './DuckCM.png',
    url : ['/shirt_baked.glb', '/Duck.glb'],
    url2 : [["/candlestick_lowpoly_final.obj", "/candlestick_lowpoly_final.mtl", [-12,-3,0], [0, 1.55, 0]], ["/closet_final.obj", "/closet_final.mtl", [12,-20,-14], [0, 0, 0]]
    , ["sm_desk_final.obj", "sm_desk_final.mtl", [-11,25,5], [0, 1.55, 0]], ["/jewelbox_lowpoly1.obj", "/jewelbox_lowpoly1.mtl", [-10,-2,12], [0, 1.55, 0]]],
    click : 0,
    obj : false
});

export default state;