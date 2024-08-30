import Notice from "../models/notification.js";
import Intervention from "../models/intervention.js";
import User from "../models/user.js";

export const createIntervention = async (req, res) => {
  try {
    const { userId } = "66ce61b9598343db6e4f20d7";
    console.log("userId" , userId);

    const { title, team, customer , stage, date, priority, assets } = req.body;

    let text = "New intervention has been assigned to you";
    if (team?.length > 1) {
      text = text + ` and ${team?.length - 1} others.`;
    }

    text =
      text +
      ` The intervention priority is set a ${priority} priority, so check and act accordingly. The intervention date is ${new Date(
        date
      ).toDateString()}. Thank you!!!`;

    const activity = {
      type: "assigned",
      activity: text,
      by: userId,
    };

    const intervention = await Intervention.create({
      title,
      team,
      customer,
      stage: stage.toLowerCase(),
      date,
      priority: priority.toLowerCase(),
      assets,
      activities: activity,
    });

    await Notice.create({
      team,
      text,
      intervention: intervention._id,
    });

    res
      .status(200)
      .json({ status: true, intervention, message: "Intervention created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const duplicateIntervention = async (req, res) => {
  try {
    const { id } = req.params;

    const intervention = await Intervention.findById(id);

    const newIntervention = await Intervention.create({
      ...intervention,
      title: intervention.title + " - Duplicate",
    });

    newIntervention.team = intervention.team;
    newIntervention.subInterventions = intervention.subInterventions;
    newIntervention.assets = intervention.assets;
    newIntervention.priority = intervention.priority;
    newIntervention.stage = intervention.stage;

    await newIntervention.save();

    //alert users of the intervention
    let text = "New intervention has been assigned to you";
    if (intervention.team.length > 1) {
      text = text + ` and ${intervention.team.length - 1} others.`;
    }

    text =
      text +
      ` The intervention priority is set a ${
        intervention.priority
      } priority, so check and act accordingly. The intervention date is ${intervention.date.toDateString()}. Thank you!!!`;

    await Notice.create({
      team: intervention.team,
      text,
      intervention: newIntervention._id,
    });

    res
      .status(200)
      .json({ status: true, message: "Intervention duplicated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const postInterventionActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { type, activity } = req.body;

    const intervention = await Intervention.findById(id);

    const data = {
      type,
      activity,
      by: userId,
    };

    intervention.activities.push(data);

    await intervention.save();

    res
      .status(200)
      .json({ status: true, message: "Activity posted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const dashboardStatistics = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;

    const allInterventions = isAdmin
      ? await Intervention.find({
          isTrashed: false,
        })
          .populate({
            path: "team",
            select: "name role title email",
          })
          .sort({ _id: -1 })
      : await Intervention.find({
          isTrashed: false,
          team: { $all: [userId] },
        })
          .populate({
            path: "team",
            select: "name role title email",
          })
          .sort({ _id: -1 });

    const users = await User.find({ isActive: true })
      .select("name title role isAdmin createdAt")
      .limit(10)
      .sort({ _id: -1 });

    //   group intervention by stage and calculate counts
    const groupInterventionks = allInterventions.reduce((result, intervention) => {
      const stage = intervention.stage;

      if (!result[stage]) {
        result[stage] = 1;
      } else {
        result[stage] += 1;
      }

      return result;
    }, {});

    // Group interventions by priority
    const groupData = Object.entries(
      allInterventions.reduce((result, intervention) => {
        const { priority } = intervention;

        result[priority] = (result[priority] || 0) + 1;
        return result;
      }, {})
    ).map(([name, total]) => ({ name, total }));

    // calculate total interventions
    const totalInterventions = allInterventions?.length;
    const last10Intervention = allInterventions?.slice(0, 10);

    const summary = {
      totalInterventions,
      last10Intervention,
      users: isAdmin ? users : [],
      interventions: groupInterventionks,
      graphData: groupData,
    };

    res.status(200).json({
      status: true,
      message: "Successfully",
      ...summary,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getInterventions = async (req, res) => {
  try {
    const { stage, isTrashed } = req.query;

    let query = { isTrashed: isTrashed ? true : false };

    if (stage) {
      query.stage = stage;
    }

    let queryResult = Intervention.find(query)
      .populate({
        path: "team",
        select: "name title email",
      })
      .sort({ _id: -1 });

    const interventions = await queryResult;

    res.status(200).json({
      status: true,
      interventions,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getIntervention = async (req, res) => {
  try {
    const { id } = req.params;

    const intervention = await Intervention.findById(id)
      .populate({
        path: "team",
        select: "name title role email",
      })
      .populate({
        path: "activities.by",
        select: "name",
      });

    res.status(200).json({
      status: true,
      intervention,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const createSubIntervention = async (req, res) => {
  try {
    const { title, tag, date } = req.body;

    const { id } = req.params;

    const newSubIntervention = {
      title,
      date,
      tag,
    };

    const intervention = await Intervention.findById(id);

    intervention.subInterventions.push(newSubIntervention);

    await intervention.save();

    res
      .status(200)
      .json({ status: true, message: "SubIntervention added successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const updateIntervention = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, team, stage, priority, assets } = req.body;

    const intervention = await Intervention.findById(id);

    intervention.title = title;
    intervention.date = date;
    intervention.priority = priority.toLowerCase();
    intervention.assets = assets;
    intervention.stage = stage.toLowerCase();
    intervention.team = team;

    await intervention.save();

    res
      .status(200)
      .json({ status: true, message: "Intervention duplicated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const trashIntervention = async (req, res) => {
  try {
    const { id } = req.params;

    const intervention = await Intervention.findById(id);

    intervention.isTrashed = true;

    await intervention.save();

    res.status(200).json({
      status: true,
      message: `Intervention trashed successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteRestoreIntervention = async (req, res) => {
  try {
    const { id } = req.params;
    const { actionType } = req.query;

    if (actionType === "delete") {
      await Intervention.findByIdAndDelete(id);
    } else if (actionType === "deleteAll") {
      await Intervention.deleteMany({ isTrashed: true });
    } else if (actionType === "restore") {
      const resp = await Intervention.findById(id);

      resp.isTrashed = false;
      resp.save();
    } else if (actionType === "restoreAll") {
      await Intervention.updateMany(
        { isTrashed: true },
        { $set: { isTrashed: false } }
      );
    }

    res.status(200).json({
      status: true,
      message: `Operation performed successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
