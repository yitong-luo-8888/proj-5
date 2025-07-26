import jwt from 'jsonwebtoken';
import User from './../Models/Auth.js';

const signToken = (user) =>
  jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });

export const protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer '))
    return res.status(401).json({ error: 'Not authenticated' });

  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) throw new Error();
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};



export const login = async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password)

  if (!username || !password)
    return res.status(400).json({ error: 'Username & password required' });

  const user = await User.findOne({ username });
  console.log(user)
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = signToken(user);
  console.log(token)
  res.json({ token, user: { id: user._id, username: user.username } });
}

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password)

    if (!username || !password)
      return res.status(400).json({ error: 'Username & password required' });

    const user = await User.create({ username, password });

    console.log(user)
    const token = signToken(user);
    console.log(token)
    res.status(201).json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    if (err.code === 11000)  // duplicate key
      return res.status(409).json({ error: 'Username already taken' });
    res.status(400).json({ error: err.message });
  }
}