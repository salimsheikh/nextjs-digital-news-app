// src/app/api/auth/login/route.ts
import connectDB from '../../../../../config/db';
import User from '../../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {

  // Parse the JSON body from the request
  const req_user = await request.json();

  // Connect to the database
  await connectDB();

  const { email, password } = req_user;

  // Validate required fields (returning an error if any are empty)
  if (!email || !password) { // Avoid empty-string comparisons for simplicity
    return new Response(
      JSON.stringify({
        message: 'All fields are required.',
      }),
      { status: 409 } // 409 Conflict for validation issues
    );
  }


  const user = await User.findOne({ email });

  if (!user) {
    return new Response(
      JSON.stringify({
        message: 'User not found.',       
      }),
      { status: 404 } // 409 Conflict if duplicate found
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return new Response(
      JSON.stringify({
        message: 'Invalid credentials.',
      }),
      { status: 401 } // 401 Conflict if duplicate found
    );
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });

  return new Response(
    JSON.stringify({
      message: 'Successfully logged in.',
      token: token,
    }),
    { status: 201 } // 401 Conflict if duplicate found
  );
}
