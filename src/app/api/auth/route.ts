// pages/api/auth/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectDB from '../../../../config/db';
import User from '../../../../models/User';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  switch (req.method) {
    case 'POST':
      return login(req, res);
    case 'DELETE':
      return logout(req, res);
    case 'GET':
      return getProtectedData(req, res);
    default:
      res.status(405).end();
  }
}

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);
  res.status(200).json({ message: 'Login successful' });
}

function logout(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0');
  res.status(200).json({ message: 'Logout successful' });
}

async function getProtectedData(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    jwt.verify(token, JWT_SECRET);
    res.status(200).json({ data: 'Protected data' });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
