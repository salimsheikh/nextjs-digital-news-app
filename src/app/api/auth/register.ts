import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../config/db';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

interface RegisterResponse {
  message?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>
) {
  if (req.method !== 'POST') return res.status(405).end();

  await connectDB();

  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User<IUser>({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'User registration failed' });
  }
}
