//@desc       Get All Bootcamps
//@route      Get api/v1/bootcamps
//@access     public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ msg: 'get all bootcamps' });
};

//@desc       Get One Bootcamps
//@route      Get api/v1/bootcamps/:id
//@access     public
exports.getOneBootcamps = (req, res, next) => {
  res.status(200).json({ msg: `get all bootcamps ${req.params.id}` });
};

//@desc       Create  Bootcamps
//@route      POST api/v1/bootcamps/
//@access     private
exports.createBootcamps = (req, res, next) => {
  res.status(201).json({ msg: 'create bootcamps' });
};

//@desc       Update Bootcamps
//@route      PUT api/v1/bootcamps/:id
//@access     private
exports.updateBootcamps = (req, res, next) => {
  res.status(200).json({ msg: `update bootcamps ${req.params.id}` });
};

//@desc       Delete Bootcamps
//@route      Delete api/v1/bootcamps/:id
//@access     private
exports.deleteBootcamps = (req, res, next) => {
  res.status(204).json({ msg: `delete bootcamps ${req.params.id}` });
};
