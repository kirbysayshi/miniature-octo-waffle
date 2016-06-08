
export const SET_RENDER_SIZE = 'SET_RENDER_SIZE';

export const createSetRenderSize = (width, height) => ({
  type: SET_RENDER_SIZE,
  width,
  height,
});
