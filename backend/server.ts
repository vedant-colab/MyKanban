import app from ".";
import connectDB from "./src/config/db";
import logger from "./src/config/logger";

const PORT = process.env.PORT || 8085;

(async () => {
    await connectDB();
  
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
    });
  })();