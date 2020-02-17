import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required()
        .email(),
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed!' });

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ error: 'User not find!' });

    if (!(await user.checkPassword(password)))
      return res.status(400).json({ error: ' Passowd incorrect!' });

    const { id, name } = user;

    return res.json({
      user: { id, email, name },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiredIn,
      }),
    });
  }
}

export default new SessionController();
