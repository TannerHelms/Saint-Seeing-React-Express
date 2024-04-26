import { Request, Response, NextFunction } from "express";
import fs from "fs";

const handleFiles = (req: Request) => {
    // Check if assets/background directory exists, if not create it
    const backgroundDir = "./public/assets/background";
    if (!fs.existsSync(backgroundDir)) {
        fs.mkdirSync(backgroundDir);
    }
    // Check if assets/avatar directory exists, if not create it
    const avatarDir = "./public/assets/avatar";
    if (!fs.existsSync(avatarDir)) {
        fs.mkdirSync(avatarDir);
    }
    const background = Array.isArray(req.files?.background) ? req.files.background[0] : req.files?.background;
    const profile = Array.isArray(req.files?.profile) ? req.files.profile[0] : req.files?.profile;
    const backgroundPath = `/assets/background/${req.user!!.id}.${background?.mimetype.split("/")[1]}`;
    const profilePath = `/assets/avatar/${req.user!!.id}.${profile?.mimetype.split("/")[1]}`;
    if (background) background.mv("./public" + backgroundPath);
    if (profile) profile.mv("./public" + profilePath);

    return { background, profile, backgroundPath, profilePath };
}
export default handleFiles;