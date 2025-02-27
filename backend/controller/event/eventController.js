import Event from "../../model/event/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, date, time } = req.body;
    const userId = req.user.id; // From auth middleware

    const event = await Event.create({
      userId,
      title,
      date,
      time
    });

    res.status(201).json({ success: true, event });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserEvents = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware

    const events = await Event.findAll({
      where: { userId },
      order: [['date', 'ASC']]
    });

    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error('Get user events error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, time } = req.body;
    const userId = req.user.id;

    const event = await Event.findOne({
      where: { id, userId }
    });

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    await event.update({
      title,
      date,
      time
    });

    res.status(200).json({ success: true, event });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const event = await Event.findOne({
      where: { id, userId }
    });

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    await event.destroy();

    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
