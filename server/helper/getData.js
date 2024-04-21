const extractToken = (tokenCookie) => {
  if (!tokenCookie) {
    return res.status(401).json({ auth: false, message: "No token provided." });
  }
  // Find the start and end index of the token value
  const tokenStartIndex = tokenCookie.indexOf("token="); // Find the index where "token=" starts
  if (tokenStartIndex === -1) {
    console.log("Token cookie not found");
    // Handle the case where "token=" is not found (cookie does not exist or malformed)
  }
  // Find the end of the token value (next semicolon or end of string)
  const tokenEndIndex = tokenCookie.indexOf(";", tokenStartIndex); // Find the index of the next semicolon after "token="
  const token = tokenCookie.slice(
    tokenStartIndex + 6,
    tokenEndIndex !== -1 ? tokenEndIndex : undefined
  );
  return token;
};
export default extractToken;
