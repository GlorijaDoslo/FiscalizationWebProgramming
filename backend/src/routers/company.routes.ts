import express from 'express';
import { CompanyController } from '../controllers/company.controller';


const companyRouter = express.Router();

companyRouter.route('/getAllCompanyData').post(
    (req, res)=>new CompanyController().getAllCompanyData(req, res)
)

companyRouter.route('/getCompany').post(
    (req, res)=>new CompanyController().getCompany(req, res)
)

companyRouter.route('/changeFirstname').post(
    (req, res)=>new CompanyController().changeFirstname(req, res)
)

companyRouter.route('/changeLastname').post(
    (req, res)=>new CompanyController().changeLastname(req, res)
)

companyRouter.route('/changePhone').post(
    (req, res)=>new CompanyController().changePhone(req, res)
)

companyRouter.route('/changeEmail').post(
    (req, res)=>new CompanyController().changeEmail(req, res)
)

companyRouter.route('/changeUsername').post(
    (req, res)=>new CompanyController().changeUsername(req, res)
)

companyRouter.route('/changeComname').post(
    (req, res)=>new CompanyController().changeComname(req, res)
)

companyRouter.route('/changeAddress').post(
    (req, res)=>new CompanyController().changeAddress(req, res)
)

companyRouter.route('/changePIB').post(
    (req, res)=>new CompanyController().changePIB(req, res)
)

companyRouter.route('/changeComnumber').post(
    (req, res)=>new CompanyController().changeComnumber(req, res)
)

companyRouter.route('/changePDV').post(
    (req, res)=>new CompanyController().changePDV(req, res)
)

companyRouter.route('/getAllAccounts').post(
    (req, res)=>new CompanyController().getAllAccounts(req, res)
)

companyRouter.route('/getAllWarehouses').post(
    (req, res)=>new CompanyController().getAllWarehouses(req, res)
)

companyRouter.route('/getAllRegisters').post(
    (req, res)=>new CompanyController().getAllRegisters(req, res)
)

companyRouter.route('/searchCompaniesByPIB').post(
    (req, res)=>new CompanyController().searchCompaniesByPIB(req, res)
)

companyRouter.route('/searchCompaniesByName').post(
    (req, res)=>new CompanyController().searchCompaniesByName(req, res)
)

companyRouter.route('/searchCompaniesByPIBAndName').post(
    (req, res)=>new CompanyController().searchCompaniesByPIBAndName(req, res)
)

companyRouter.route('/addOrderer').post(
    (req, res)=>new CompanyController().addOrderer(req, res)
)

export default companyRouter;