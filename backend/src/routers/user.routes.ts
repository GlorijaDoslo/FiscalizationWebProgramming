import express from 'express';
import { CompanyController } from '../controllers/company.controller';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();


userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route('/chpass').post(
    (req, res)=>new UserController().chpass(req, res)
)

userRouter.route('/getAllRequests').get(
    (req, res) => new UserController().getAllRequests(req, res)
);

userRouter.route('/acceptUser').post(
    (req, res)=>new UserController().acceptUser(req, res)
)

userRouter.route('/declineUser').post(
    (req, res)=>new UserController().declineUser(req, res)
)

userRouter.route('/registerBuyer').post(
    (req, res)=>new UserController().registerBuyer(req, res)
)

userRouter.route('/getCompanies').get(
    (req, res)=>new UserController().getCompanies(req, res)
)

userRouter.route('/activateUser').post(
    (req, res)=>new UserController().activateUser(req, res)
)

userRouter.route('/deactivateUser').post(
    (req, res)=>new UserController().deactivateUser(req, res)
)

userRouter.route('/addCompanyData').post(
    (req, res)=>new UserController().addCompanyData(req, res)
)

userRouter.route('/makeFirstLoginTrue').post(
    (req, res)=>new UserController().makeFirstLoginTrue(req, res)
)

userRouter.route('/checkEmail').post(
    (req, res)=>new UserController().checkEmail(req, res)
)

userRouter.route('/checkUsername').post(
    (req, res)=>new UserController().checkUsername(req, res)
)


// userRouter.route('/uploadImage').post(
//     (req, res)=>new UserController().uploadImage(req, res)
// )

export default userRouter;