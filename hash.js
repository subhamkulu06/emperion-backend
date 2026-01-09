const bcrypt = require("bcryptjs");

(async () => {
  const password = "Admin@123"; // choose a NEW password
  const hash = await bcrypt.hash(password, 10);
  console.log("PASSWORD:", password);
  console.log("HASH:", hash);
})();