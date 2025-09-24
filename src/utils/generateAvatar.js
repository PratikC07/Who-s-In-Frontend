// Generate consistent avatars based on user data
const generateAvatar = (name) => {
  const seed = name.toLowerCase().replace(/\s+/g, "");
  return `https://api.dicebear.com/9.x/bottts/svg?seed=${seed}&backgroundColor=b6e3f4`;
};

export default generateAvatar;
