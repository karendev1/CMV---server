const Event = require("../models/Event");

export async function create(req: any, res: any) {
  try {
    const { activityId } = req.params;
    const event = new Event({
      ...req.body,
      activityId,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}


export async function edit(req: any, res: any) {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteEvent(req: any, res: any) {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted successfully' });
      } catch (err: any) {
        res.status(400).json({ error: err.message });
      }
}

export async function list(req: any, res: any){
    try {
        const event = await Event.find();
        res.json(event);
      } catch (err: any) {
        res.status(400).json({ error: err.message });
      }
}

export async function listById(req: any, res: any) {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
      } catch (err: any) {
        res.status(400).json({ error: err.message });
      }
}


export async function listByActivity(req: any, res: any) {
  try {
    const { activityId } = req.params;
    const events = await Event.find({ activityId });
    res.json(events);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
