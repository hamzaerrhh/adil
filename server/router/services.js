import { Router } from "express";
import Demand from "../modules/demande.js";
import jwt from "jsonwebtoken";
import extraextractToken from "../helper/getData.js";
import extractToken from "../helper/getData.js";
import User from "../modules/user.js";
const route = Router();

route.post("/add", async (req, res) => {
  console.log(req.body);
  const tokenCookie = req.headers.cookie;
  if (!tokenCookie) {
    return res.status(501).json({ message: "Vous devez être connecté" });
  }
  const token = extractToken(tokenCookie);
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  console.log("userid", userId);

  const newDemand = {
    userId: userId,
    name: "demande des papier",
    details: {
      full_name: req.body.full_name,
      studentNumber: req.body.student_number,
      phone: req.body.phone,
      identifiant_number: req.body.identifiant_number,
    },
    demandType: req.body.type,
  };
  console.log(newDemand);
  const add = new Demand(newDemand);
  await add.save();
  res.status(201).json({ message: "the demand send", demande: add });
});
route.get("/feetchall", async (req, res) => {
  const cookie = req.headers.cookie;
  console.log("getting all info ");

  if (!cookie) {
    return res.status(501).json({ message: "not authorize" });
  }
  const token = extraextractToken(cookie);
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const demandes = await Demand.find().sort({ createdAt: -1 });

    console.log("the demand all");

    if (user.role == "responsable d'attestaion") {
      // Filter demands by demandType "attestation"
      const demandesent = demandes.filter(
        (demand) => demand.demandType === "attestation"
      );
      console.log("the demand to sent", demandesent);

      // Return filtered demands as response
      return res.status(200).json(demandesent.sort(-1));
    }

    return res.status(200).json(demandes);
  } catch (err) {
    res.status(500).send("Erreur de serveur");
  }
});
route.get("/feetchmy", async (req, res) => {
  console.log("start fetching my own demande");

  const cookie = req.headers.cookie;

  if (!cookie) {
    return res.status(501).json({ message: "not authorize" });
  }
  try {
    const token = extraextractToken(cookie);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    //geting mhy demand
    const demands = await Demand.find({ userId: decodedToken.userId })
      .sort({ createdAt: -1 }) // Sort demands from newest to oldest based on createdAt
      .select("-userId -__v"); // Exclude userId and version (__v) from response
    res.status(201).json(demands);
  } catch (err) {
    console.log(err);
  }
});
route.put("/update", async (req, res) => {
  console.log("start updating");

  try {
    const demands = req.body.res; // Assuming demands are under 'res' key in req.body

    console.log("the demande to update", demands);

    // Use Promise.all() to wait for all updates to complete
    const updatedDemands = await Promise.all(
      demands.map(async (demand, index) => {
        // Await the result of findOneAndUpdate
        return await Demand.findOneAndUpdate(
          { _id: demand._id },
          { $set: demand },
          { new: true } // to return the modified document
        );
      })
    );

    console.log("Updated demands:", updatedDemands);

    res.status(200).send("Demands updated successfully");
  } catch (err) {
    console.log("there is an error", err);
    res.status(500).send("Error updating demands");
  }
});

export default route;
