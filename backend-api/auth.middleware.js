import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acesso não autorizado' });
  }

  const token = bearer.split(' ')[1];

  try {
    const provider = jwt.verify(token, 'SEU_SEGREDO_SUPER_SECRETO');
    req.provider = provider; // Adiciona os dados do provider ao objeto da requisição
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};