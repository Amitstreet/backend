import Location from '../Modal/locaton_modal.js';
import User from '../Modal/user_modal.js'

// Add or update the current location
export const add_current_location = async (req, res) => {
  try {
    const { userid, location } = req.body;
    const updatedLocation = await Location.findOneAndUpdate(
      { userid }, // Filter by userid
      { $set: { location } }, // Update the location field
      { new: true, upsert: true } // Create a new document if none exists
    );

    res.status(201).send(updatedLocation);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get the nearest location
export const nearest_location = async (req, res) => {
  // try {
  //   console.log(req)
  //   const { lng, lat } = req.query
  //   const coordinates = [parseFloat(lng), parseFloat(lat)];
  //   if (!coordinates || coordinates.length !== 2 || isNaN(coordinates[0]) || isNaN(coordinates[1])) {
  //     return res.status(400).send({ error: 'Invalid coordinates' });
  //   }
  //   const radiusInKilometers = 50;
  //   const radiusInRadians = radiusInKilometers / 6378.1; // Earth radius in km
  //   const nearestLocation  = await Location.find({
  //     location: {
  //       $geoWithin: {
  //         $centerSphere: [
  //           coordinates, // your longitude and latitude
  //           radiusInRadians
  //         ]
  //       }
  //     }
  //   });



  

  //   if (!nearestLocation) {
  //     return res.status(404).send({ message: 'No location found within the specified radius' });
  //   }

  //   res.status(200).send(nearestLocation);
  // } catch (error) {
  //   res.status(500).send(error);
  // }
  try {
    const { lng, lat } = req.query;
    console.log(lng,lat)
    const coordinates = [parseFloat(lng), parseFloat(lat)];

    if (!coordinates || coordinates.length !== 2 || isNaN(coordinates[0]) || isNaN(coordinates[1])) {
      return res.status(400).send({ error: 'Invalid coordinates' });
    }

    const radiusInKilometers = 50;
    const radiusInRadians = radiusInKilometers / 6378.1; // Earth radius in km

    // Find nearest locations
    const nearestLocations = await Location.find({
      location: {
        $geoWithin: {
          $centerSphere: [
            coordinates,
            radiusInRadians
          ]
        }
      }
    });

    if (!nearestLocations.length) {
      return res.status(404).send({ message: 'No locations found within the specified radius' });
    }

    // Extract user IDs from the nearest locations
    const userIds = nearestLocations.map(location => location.userid);
      
    // Find users by the extracted user IDs
    const users = await User.find({ _id: { $in: userIds } });
    res.status(200).send({ users });
  } catch (error) {
    res.status(500).send(error);
  }
};
