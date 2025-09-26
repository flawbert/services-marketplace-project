import db from '../db.js';

export const getServiceTypes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM service_types ORDER BY name');
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('ERROR. Could not search for services types:', error);
    return res.status(500).json({ error: 'Internal error in the services types search.' });
  }
};

export const createService = async (req, res) => {
  try {
    const providerId = req.provider?.id;
    if (!providerId) {
      return res.status(401).json({ error: 'Unauthorized: provider not found.' });
    }

    const { name, description, serviceTypeId, variations, photos } = req.body;

    if (!name || !serviceTypeId) {
      return res.status(400).json({ error: 'Nome e tipo de serviço são obrigatórios.' });
    }
    if (!Array.isArray(variations) || variations.length === 0) {
      return res.status(400).json({ error: 'Ao menos uma variação é necessária.' });
    }

    const client = await db.getClient();
    try {
      await client.query('BEGIN');
      const serviceQuery = `
        INSERT INTO services (name, description, provider_id, service_type_id, photos)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `;
      const serviceResult = await client.query(serviceQuery, [
        name,
        description || null,
        providerId,
        parseInt(serviceTypeId),
        photos || []
      ]);
      const serviceId = serviceResult.rows[0].id;

      const variationQuery = `
        INSERT INTO service_variations (name, price, duration_in_minutes, service_id)
        VALUES ($1, $2, $3, $4)
      `;
      for (const v of variations) {
        const vPrice = parseFloat(v.price);
        const vDuration = parseInt(v.duration);
        if (!v.name || Number.isNaN(vPrice) || Number.isNaN(vDuration)) {
          throw new Error('Variações inválidas. Cada variação precisa de name, price e duration válidos.');
        }
        await client.query(variationQuery, [v.name, vPrice, vDuration, serviceId]);
      }

      await client.query('COMMIT');
      return res.status(201).json({ message: 'Service successfully created!', serviceId });

    } catch (innerErr) {
      await client.query('ROLLBACK');
      console.error('Error creating service (transaction):', innerErr);
      return res.status(500).json({ error: 'Internal error creating service.' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error in createService:', error);
    return res.status(500).json({ error: 'Internal error creating service.' });
  }
};

export const createServiceType = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'The field NAME is required.' });
  }
  try {
    const result = await db.query('INSERT INTO service_types (name) VALUES ($1) RETURNING *', [name]);
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'This service type already exists.' });
    }
    console.error('ERROR at the creation of the service type:', error);
    return res.status(500).json({ error: 'Internal error at the creation of the service type.' });
  }
};

export const deleteServiceType = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM service_types WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Service type not found.' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('ERROR. Service type not deleted:', error);
    return res.status(500).json({ error: 'Internal error in the service type deletion.' });
  }
};