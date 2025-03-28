// Create Booking
export function createBooking(req, res) {
    try {
      const newBooking = new WashingSection(req.body);
      newBooking.save();
      res.status(201).json({ message: "Booking Created", data: newBooking });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };