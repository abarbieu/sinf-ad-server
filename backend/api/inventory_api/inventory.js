// calls to the ad inventory (google cloud bucket that stores images by name)
require("dotenv").config({ path: "/" });

// PUT received ad metadata, including image path, in database, and image data in folder
const storeAd = (req, res) => {};

// POST request with ad id, and content of the ad, if id exists, update provided content
const updateAd = (req, res) => {};

// https://cloud.google.com/storage/docs/xml-api/get-object
// GET request with ad ID at path which sends all metadata from DB in JSON form
const getAdByName = (req, res) => {
	const name = req.params.adName;

	try {
		// GET call to bucket
		// if the image exists, get the image and store it locally
		// return the path to that image to get accessed front end
		const adPath = "/ad_images/" + name + ".jpg";
		res.status(200).json(adPath);
	} catch (err) {
		// ad doesnt exist under that name
		// send back error response
		res.status(400).json({ err: "No ad found with name " + name });
		return;
		// other possible errors?
	}
};

// GET request with ad ID at different path which returns a JSON object containing all metadata and image data
const getAdAtPath = (req, res) => {};

module.exports = {
	storeAd,
	updateAd,
	getAdByName,
	getAdAtPath,
};
