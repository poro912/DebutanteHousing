
DELIMITER $$ 
DROP PROCEDURE IF EXISTS select_seq $$
CREATE PROCEDURE select_seq (
  v_name VARCHAR(255)
)
BEGIN
  DECLARE
    v_code INT;
    v_data VARCHAR;
  BEGIN

    SELECT id, data
    INTO v_id, v_data
    FROM my_table
    WHERE v_name = v_name;

    IF v_id IS NOT NULL THEN
      RETURN v_code;
    ELSE
      RETURN NULL;
    END IF;

  END;
$$
DELIMITER ;