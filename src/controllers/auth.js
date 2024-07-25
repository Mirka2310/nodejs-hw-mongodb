import { loginUser } from '../services/auth.js';
import { registerUser } from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';
import { logoutUser } from '../services/auth.js';
import { refreshUsersSession } from '../services/auth.js';
import { requestResetToken } from '../services/auth.js';
import { resetPassword } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  console.log('Register User Request Body:', req.body); // Логування запиту на реєстрацію

  try {
    const user = await registerUser(req.body);
    console.log('User Registered Successfully:', user); // Логування успішної реєстрації

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: user,
    });
  } catch (error) {
    console.error('Error in Register User Controller:', error); // Логування помилки
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  console.log('Login User Request Body:', req.body); // Логування запиту на логін

  try {
    const session = await loginUser(req.body);
    console.log('User Logged In Successfully:', session); // Логування успішного логіну

    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });

    res.json({
      status: 200,
      message: 'Successfully logged in an user!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    console.error('Error in Login User Controller:', error); // Логування помилки
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

export const logoutUserController = async (req, res) => {
  console.log('Logout User Request Cookies:', req.cookies); // Логування cookies при виході

  try {
    if (req.cookies.sessionId) {
      await logoutUser(req.cookies.sessionId);
      console.log('User Session Logged Out:', req.cookies.sessionId); // Логування успішного виходу
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
  } catch (error) {
    console.error('Error in Logout User Controller:', error); // Логування помилки
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

const setupSession = (res, session) => {
  console.log('Setting Up Session:', session); // Логування налаштування сесії

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const refreshUserSessionController = async (req, res) => {
  console.log('Refresh User Session Request Cookies:', req.cookies); // Логування cookies при оновленні сесії

  if (!req.cookies.sessionId || !req.cookies.refreshToken) {
    console.log('Missing Session ID or Refresh Token');
    return res.status(400).json({
      status: 400,
      message: 'Session ID or Refresh Token not provided',
    });
  }

  try {
    const session = await refreshUsersSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });
    console.log('User Session Refreshed Successfully:', session); // Логування успішного оновлення сесії

    setupSession(res, session);

    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    console.error('Error in Refresh User Session Controller:', error); // Логування помилки
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

export const requestResetEmailController = async (req, res) => {
  console.log('Request Reset Email Request Body:', req.body); // Логування запиту на скидання паролю

  try {
    await requestResetToken(req.body.email);
    console.log('Reset Email Successfully Sent'); // Логування успішного надсилання листа

    res.json({
      message: 'Reset password email was successfully sent!',
      status: 200,
      data: {},
    });
  } catch (error) {
    console.error('Error in Request Reset Email Controller:', error); // Логування помилки
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  console.log('Reset Password Request Body:', req.body); // Логування запиту на скидання паролю

  try {
    await resetPassword(req.body);
    console.log('Password Successfully Reset'); // Логування успішного скидання паролю

    res.json({
      message: 'Password was successfully reset!',
      status: 200,
      data: {},
    });
  } catch (error) {
    console.error('Error in Reset Password Controller:', error); // Логування помилки
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message,
    });
  }
};
