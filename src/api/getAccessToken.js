const initialHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/**
 *
 * @param {('cms',)} person
 * @returns
 */
function getAccessToken(person) {
  let access_token = localStorage.getItem(`${person}_token`);

  if (access_token) {
    return {
      headers: {
        Authorization: `Bearer ${access_token}`,
        ...initialHeaders,
      },
    };
  } else {
    return {
      headers: initialHeaders,
    };
  }
}

const getAccess = { getAccessToken };

export default getAccess;
