import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";

const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 50,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [error, setError] = useState();
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url, i) => i !== index),
    });
  };
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (formData.imageUrls.length < 1) return setError;
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, useRef: currentUser._id }),
      });
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="border rounded-lg p-3 focus:outline-none "
            required
            maxLength="50"
            minLength="5"
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="border rounded-lg p-3 focus:outline-none "
            required
            onChange={handleChange}
            value={formData.descritption}
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="border rounded-lg p-3 focus:outline-none "
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parkingspot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex  flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border rounded-lg border-gray-300"
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border rounded-lg border-gray-300"
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border rounded-lg border-gray-300"
                type="number"
                id="regularPrice"
                min="50"
                max="10000"
                required
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border rounded-lg border-gray-300"
                type="number"
                id="discountPrice"
                min="50"
                max="1000"
                required
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <div className="flex items-center flex-col">
                <p>Discounted price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded-lg w-full"
              type="file"
              id="images"
              accept="images/*"
              multiple
            />
            <button
              disabled={uploading}
              onClick={handleImageSubmit}
              type="button"
              className="p-3 text-green-700 border border-green-700 uppercase hover:shadow-lg disabled:opacity-80 rounded"
            >
              {uploading ? "uploading..." : "upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((urls, index) => (
              <div
                key={index}
                className="flex justify-between p-3 border items-center "
              >
                <img
                  src={urls}
                  alt="Listing image"
                  className="w-40 h-40 object-cover rounded-lg"
                />
                <button
                  className="p-3 text-red-700 uppercase hover:opacity-75 font-semibold"
                  type="button"
                  onClick={() => {
                    handleRemoveImage(index);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          <p className="text-red-700">{error && error}</p>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
