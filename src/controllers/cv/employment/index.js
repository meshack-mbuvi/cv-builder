import { EmploymentHistory } from '../../../sequelize/models';

export class EmploymentController {
  /**
   * @description - This method creates a new
   * @param {*} request
   * @param {*} response
   */
  static async new(request, response) {
    const {
      body: { title, employer, city, startDate, endDate, description },
      user: { user_id },
    } = request;

    try {
      const formatedStartDate = new Date(startDate);
      const formatedEndDate = new Date(endDate);

      const employment = await EmploymentHistory.create({
        title,
        employer,
        user_id,
        city,
        description,
        startDate: new Date(formatedStartDate),
        endDate: new Date(formatedEndDate),
      });

      return response
        .status(201)
        .send({ employment, message: 'Employment record added successfully' });
    } catch (error) {
      return response
        .status(500)
        .send({ error: 'An error occured, please try again' });
    }
  }
}
