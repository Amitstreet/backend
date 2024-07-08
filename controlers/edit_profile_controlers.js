import User from '../Modal/user_modal.js';

// Controller to update mobile number and location
export const edit_profile_controlers = async (req, res) => {
  // const { userId } = req.params;
  const { city, phoneNumber } = req.body;
  const { userId } = req.params;
  const MobileNumber = phoneNumber;
  const location = city;
   console.log(location,MobileNumber);
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { location, MobileNumber },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 
};
