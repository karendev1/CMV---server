const Activity = require("../models/Activity");

export async function create(req: any, res: any) {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function edit(req: any, res: any) {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!activity) return res.status(404).json({ message: "activity not found" });
    res.json(activity);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteActivity(req: any, res: any) {
    try {
        const activity = await Activity.findByIdAndDelete(req.params.id);
        if (!activity) return res.status(404).json({ message: 'Activity not found' });
        res.json({ message: 'Activity deleted successfully' });
      } catch (err: any) {
        res.status(400).json({ error: err.message });
      }
}

export async function list(req: any, res: any){
    try {
        const activity = await Activity.find();
        res.json(activity);
      } catch (err: any) {
        res.status(400).json({ error: err.message });
      }
}

export async function listById(req: any, res: any) {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) return res.status(404).json({ message: 'Activity not found' });
        res.json(activity);
      } catch (err: any) {
        res.status(400).json({ error: err.message });
      }
}