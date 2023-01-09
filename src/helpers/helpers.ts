export const validateBody = (body: string) => {
  const { username, age, hobbies } = JSON.parse(body);

  if (typeof username !== 'string') {
    return false;
  }

  if (typeof age !== 'number') {
    return false;
  }

  if (!Array.isArray(hobbies)) {
    return false;
  }

  if (Array.isArray(hobbies)) {
    if (
      hobbies.length !== 0 &&
      hobbies.some((hobby: string | number) => typeof hobby !== 'string')
    ) {
      return false;
    }
  }

  return true;
};
