import Listing from "../models/listing.model.js";
export const createListing = async (req, res, next) => {
  //fetch data
  const {
    name,
    description,
    address,
    regularPrice,
    discountedPrice,
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
    if (
      !name ||
      !description ||
      !address ||
      !regularPrice ||
      !bathrooms ||
      !discountedPrice ||
      !bedrooms ||
      !furnished ||
      !parking ||
      !type ||
      !offer ||
      !imageUrls ||
      !useRef
    ) {
      return res.status(401).json({
        message: false,
        success: "All fields are necessary",
      });
    }
    const listing = await Listing.create({
      name,
      description,
      address,
      regularPrice,
      discountedPrice,
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
