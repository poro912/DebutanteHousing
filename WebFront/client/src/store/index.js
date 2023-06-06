import { proxy } from "valtio";

const state = proxy({
    intro : true,
    color : '#74675c',
    isLogoTexture : false,
    isFullTexture : false,
    logoDecal : './threejs.png',
    fullDecal : './DuckCM.png',
    url : ['/shirt_baked.glb', '/Duck.glb'],
    url2 : [["/candlestick_lowpoly_final.obj", "/candlestick_lowpoly_final.mtl", [2,-20,2]]],
    click : 0,
    obj : false
});

export default state;