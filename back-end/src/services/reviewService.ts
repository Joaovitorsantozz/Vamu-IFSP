import pool from "../database.js";

export async function getRatingService(user_id: number) {
  const query = `SELECT COUNT (*) AS total_rating, 
    ROUND (AVG(rating),2) AS media_rating,
    
    
    COUNT (CASE WHEN rating = 1 THEN 1 END) AS count_1_estrela,
    COUNT (CASE WHEN rating = 2 THEN 1 END) AS count_2_estrela,
    COUNT (CASE WHEN rating = 3 THEN 1 END) AS count_3_estrela,
    COUNT (CASE WHEN rating = 4 THEN 1 END) AS count_4_estrela,
    COUNT (CASE WHEN rating = 5 THEN 1 END) AS count_5_estrela
    FROM reviews WHERE reviewed_id = $1`;

  const result = await pool.query(query, [user_id]);

  return result.rows[0];
}

export async function getFeedbackTagsService(user_id: number) {
  const query = `SELECT 
    ft.id AS tag_id,
    ft.label,
    ft.type,
    COALESCE(
        (
            SELECT COUNT(*) 
            FROM reviews_feedbacks rf
            JOIN reviews r ON r.id = rf.review_id
            WHERE rf.tag_id = ft.id AND r.reviewed_id = $1
        ), 0
    ) AS total_count
FROM feedback_tags ft
ORDER BY ft.type DESC, ft.id ASC;`;

  const result = await pool.query(query, [user_id]);
  return result;
}
