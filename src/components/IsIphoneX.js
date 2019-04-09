export default isIphoneX = (dim, platform) => {
  return (
    platform.OS === 'ios' && 
    (dim.height == 812 || 
    dim.width == 812 || 
    dim.height == 896 || 
    dim.width == 896)
  ); 
}