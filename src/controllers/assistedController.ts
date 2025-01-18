const Assisted = require("../models/Assisted");

export async function create(req: any, res: any) {
  try {
    const assisted = new Assisted(req.body);
    await assisted.save();
    res.status(201).json(assisted);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function edit(req: any, res: any) {
  try {
    const assisted = await Assisted.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!assisted) return res.status(404).json({ message: "User not found" });
    res.json(assisted);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteAssisted(req: any, res: any) {
    try {
        const assisted = await Assisted.findByIdAndDelete(req.params.id);
        if (!assisted) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
      } catch (err: any) {
        res.status(400).json({ error: err.message });
      }
  }
  
export async function list(req: any, res: any){
    try {
        const assisteds = await Assisted.find();
        res.json(assisteds);
      } catch (err: any) {
        res.status(400).json({ error: err.message });
      }
}

export async function listById(req: any, res: any) {
    try {
        const assisted = await Assisted.findById(req.params.id);
        if (!assisted) return res.status(404).json({ message: 'User not found' });
        res.json(assisted);
      } catch (err: any) {
        res.status(400).json({ error: err.message });
      }
}