// src/app/api/auth/register/route.ts
import connectDB from '../../../../../config/db';
import User, { IUser } from '../../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  // Parse the JSON body from the request
  const req_user = await request.json();

  // Connect to the database
  await connectDB();

  try {
    // Deletes all documents in the User collection (use with caution)
    // This is potentially risky as it deletes all users; it's not typically part of a registration endpoint.
    await User.deleteMany({});

    const { username, email, password } = req_user;

    // Validate required fields (returning an error if any are empty)
    if (!username || !email || !password) { // Avoid empty-string comparisons for simplicity
      return new Response(
        JSON.stringify({
          message: 'All fields are required.',
        }),
        { status: 409 } // 409 Conflict for validation issues
      );
    }

    // Check if the username or email already exists to prevent duplicates
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return new Response(
        JSON.stringify({
          message: 'Username or Email already exists',
        }),
        { status: 409 } // 409 Conflict if duplicate found
      );
    }

    // Hash the password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    } as IUser); // Explicitly cast to IUser type

    await newUser.save();

    // Check if the user was successfully created
    if (!newUser) {
      return new Response(JSON.stringify({ message: 'Error creating user' }), {
        status: 500, // 500 Internal Server Error if creation failed
      });
    } else {
      return new Response(JSON.stringify({ message: 'User Created' }), {
        status: 201, // 201 Created for successful creation
      });
    }
  } catch (error) {
    // Log server errors for debugging (consider logging to an external service in production)
    return new Response(JSON.stringify({ message: 'SERVER ERROR' }), {
      status: 500, // 500 Internal Server Error for unexpected issues
    });
  }
}