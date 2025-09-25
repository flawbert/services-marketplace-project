import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerProvider = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All the fields are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'The password must have at least 6 characters' });
  }

  try {
    const existingProvider = await db.query('SELECT * FROM providers WHERE email = $1', [email]);
    if (existingProvider.rows.length > 0) {
      return res.status(409).json({ error: 'This e-mail is already in use.' });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newProvider = await db.query(
      'INSERT INTO providers (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, passwordHash]
    );

    res.status(201).json(newProvider.rows[0]);

  } catch (error) {
    console.error('ERROR. Could not register provider', error);
    res.status(500).json({ error: 'ERROR. An intern flaw ocurred at the server.' });
  }
};

export const loginProvider = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail and password are required.' });
  }

  try {
    const result = await db.query('SELECT * FROM providers WHERE email = $1', [email]);
    const provider = result.rows[0];

    if (!provider) {
      return res.status(401).json({ error: 'Invalide credentials.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, provider.password_hash);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalide credentials.' });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id: provider.id, email: provider.email },
      'SEU_SEGREDO_SUPER_SECRETO', // Troque por uma variável de ambiente!
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, providerId: provider.id, name: provider.name });

  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal server error:' });
  }
};
