const registerUser = async (req, res, next) => {
  try {
    const { name } = req.body;
  } catch (error) {
    next(error);
  }
};

registerUser();
