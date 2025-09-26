import db from '../db.js';
export const getAvailability = async (req, res) => {
  const providerId = req.provider.id;
  try {
    const result = await db.query(
      'SELECT day_of_week, start_time, end_time FROM provider_availability WHERE provider_id = $1',
      [providerId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error while searching for availability schedule:', error);
    res.status(500).json({ error: 'Internal error while searching for availability schedule.' });
  }
};
export const setAvailability = async (req, res) => {
  const providerId = req.provider.id;
  const { schedule } = req.body; // array de { day_of_week, start_time, end_time }

  const client = await db.getClient();
  try {
    await client.query('BEGIN');

    // 1. Deleta a agenda antiga do prestador
    await client.query('DELETE FROM provider_availability WHERE provider_id = $1', [providerId]);

    // 2. Insere a nova agenda
    const insertQuery = `
      INSERT INTO provider_availability (provider_id, day_of_week, start_time, end_time)
      VALUES ($1, $2, $3, $4)
    `;
    for (const day of schedule) {
      await client.query(insertQuery, [providerId, day.day_of_week, day.start_time, day.end_time]);
    }

    await client.query('COMMIT');
    res.status(200).json({ message: 'Availability Schedule successully updated!' });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error while saving availability schedule:', error);
    res.status(500).json({ error: 'Internal error while saving availability schedule.' });
  } finally {
    client.release();
  }
};