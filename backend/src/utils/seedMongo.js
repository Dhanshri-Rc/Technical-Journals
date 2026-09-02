const { connectDatabase, mongoose } = require("../config/db");
const { University, Journal, Conference, FooterSettings } = require("../db/models");
const { syncCounter } = require("./mongoHelpers");
const seedData = require("../../database/seedData.json");

const DEFAULT_FOOTER = {
  id: 1,
  address: "1408 Kohinoor Sportsville, Hinjewadi Phase 1, Pune, Maharashtra 411057",
  email: "contact@technicaljournals.org",
  phone: "9970294396",
  social: {
    facebook: "https://facebook.com/technicaljournals",
    linkedin: "https://linkedin.com/company/technicaljournals",
    twitter: "https://twitter.com/technicaljournals",
    youtube: "https://youtube.com/technicaljournals",
  },
  status: "active",
};

async function seedCollection(Model, records) {
  for (const record of records) {
    await Model.updateOne(
      { id: record.id },
      { $setOnInsert: record },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
}

async function run() {
  try {
    await connectDatabase();

    await seedCollection(University, seedData.universities);
    await seedCollection(Journal, seedData.journals);
    await seedCollection(Conference, seedData.conferences);
    await seedCollection(FooterSettings, [DEFAULT_FOOTER]);

    await Promise.all([
      syncCounter("universities", Math.max(0, ...seedData.universities.map((item) => item.id))),
      syncCounter("journals", Math.max(0, ...seedData.journals.map((item) => item.id))),
      syncCounter("conferences", Math.max(0, ...seedData.conferences.map((item) => item.id))),
      syncCounter("footer_settings", DEFAULT_FOOTER.id),
      syncCounter("users", 0),
      syncCounter("contact_enquiries", 0),
      syncCounter("manuscript_submissions", 0),
    ]);

    console.log("[seed] MongoDB seed completed successfully");
  } catch (err) {
    console.error("[seed] Failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();
