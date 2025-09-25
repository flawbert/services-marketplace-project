import db from '../db.js';

export const getServiceTypes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM service_types ORDER BY name');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tipos de serviço.' });
  }
};

export const createService = async (req, res) => {
  const providerId = req.provider.id; // Do middleware de autenticação
  const { name, description, serviceTypeId, variations } = req.body;

  if (!name || !serviceTypeId || !variations || variations.length === 0) {
    return res.status(400).json({ error: 'Required fields missing.' });
  }

  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    const serviceQuery = `
      INSERT INTO services (name, description, provider_id, service_type_id)
      VALUES ($1, $2, $3, $4) RETURNING id
    `;
    const serviceResult = await client.query(serviceQuery, [name, description, providerId, serviceTypeId]);
    const serviceId = serviceResult.rows[0].id;

    const variationQuery = `
      INSERT INTO service_variations (name, price, duration_in_minutes, service_id)
      VALUES ($1, $2, $3, $4)
    `;
    for (const variation of variations) {
      await client.query(variationQuery, [variation.name, variation.price, variation.duration, serviceId]);
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Service successfully created!', serviceId });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Internal error creating service.' });
  } finally {
    client.release();
  }
};