export const test = async (req, res, next) => {
  return res.status(200).json({
    message: "api is working",
  });
};
