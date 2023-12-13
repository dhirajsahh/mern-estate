import Listing from "../models/listing.model.js";
export const createListing = async (req, res, next) => {
  //fetch data
  const {
    name,
    description,
    address,
    regularPrice,
    discountPrice,
    bathrooms,
    bedrooms,
    furnished,
    parking,
    type,
    offer,
    imageUrls,
    useRef,
  } = req.body;

  try {
    const listing = await Listing.create({
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
      imageUrls,
      useRef,
    });
    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
