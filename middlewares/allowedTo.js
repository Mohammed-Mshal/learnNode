import appError from "../utils/appError.js";

export default function allowedTo(...roles) {

    return (req, res, next) => {
        if (!roles.includes(req.infoUser.role)) {
            return next(appError.create(`This Roles isn't Authorized`))
        }
        
    return next();
  };
}
