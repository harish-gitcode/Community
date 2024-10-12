const createSlug = (str: string) => {
  return str.toLowerCase().split(" ").join("-");
};
export default createSlug;
