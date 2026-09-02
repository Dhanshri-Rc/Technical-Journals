const mongoose = require("mongoose");

const timestampOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  versionKey: false,
};

const counterSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    seq: { type: Number, required: true, default: 0 },
  },
  { versionKey: false }
);

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true, index: true },
    university: { type: String, default: null },
    professional_role: {
      type: String,
      enum: ["Author", "Reviewer", "Editor", "University Administrator"],
      default: "Author",
      required: true,
    },
    password_hash: { type: String, required: true },
    account_role: { type: String, enum: ["user", "admin"], default: "user", required: true },
    status: { type: String, enum: ["active", "suspended"], default: "active", index: true },
  },
  timestampOptions
);

const universitySchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    country: { type: String, default: null },
    logo: { type: String, default: null },
    journals_count: { type: Number, default: 0 },
    website_url: { type: String, default: null },
    description: { type: String, default: null },
    status: { type: String, enum: ["active", "inactive"], default: "active", index: true },
    display_order: { type: Number, default: 0 },
    featured: { type: Number, enum: [0, 1], default: 0, index: true },
  },
  timestampOptions
);

const journalSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    short_title: { type: String, default: null },
    description: { type: String, default: null },
    about: { type: String, default: null },
    aims_scope: { type: String, default: null },
    subject_area: { type: String, default: null, index: true },
    category: { type: String, default: null, index: true },
    issn: { type: String, default: null },
    eissn: { type: String, default: null },
    pissn: { type: String, default: null },
    indexing: { type: String, default: null },
    frequency: { type: String, default: null, index: true },
    access_type: { type: String, default: "Open Access", index: true },
    language: { type: String, default: "English", index: true },
    publisher: { type: String, default: null },
    university_id: { type: Number, default: null, index: true },
    cover_image: { type: String, default: null },
    color: { type: String, default: null },
    icon: { type: String, default: null },
    website_url: { type: String, default: null },
    review_type: { type: String, default: null },
    meta_title: { type: String, default: null },
    meta_description: { type: String, default: null },
    status: { type: String, enum: ["active", "inactive"], default: "active", index: true },
    featured: { type: Number, enum: [0, 1], default: 0, index: true },
  },
  timestampOptions
);

const conferenceSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    code: { type: String, default: null },
    title: { type: String, required: true },
    conference_type: { type: String, default: null, index: true },
    subject_area: { type: String, default: null, index: true },
    organizer: { type: String, default: null },
    description: { type: String, default: null },
    topics: { type: String, default: null },
    start_date: { type: String, default: null, index: true },
    end_date: { type: String, default: null },
    display_date: { type: String, default: null },
    location: { type: String, default: null },
    city: { type: String, default: null },
    country: { type: String, default: null },
    region: { type: String, default: null, index: true },
    venue: { type: String, default: null },
    conference_mode: { type: String, default: "In-Person" },
    registration_url: { type: String, default: null },
    image: { type: String, default: null },
    color: { type: String, default: null },
    status: { type: String, enum: ["active", "inactive"], default: "active", index: true },
    featured: { type: Number, enum: [0, 1], default: 0, index: true },
  },
  timestampOptions
);

const enquirySchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "read", "replied", "closed"], default: "new", index: true },
    admin_notes: { type: String, default: null },
  },
  timestampOptions
);

const manuscriptSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    tracking_id: { type: String, required: true, unique: true, index: true },
    journal_id: { type: Number, required: true, index: true },
    title: { type: String, required: true },
    author_name: { type: String, required: true },
    email: { type: String, required: true },
    abstract: { type: String, required: true },
    file_name: { type: String, required: true },
    file_url: { type: String, required: true },
    status: {
      type: String,
      enum: ["submitted", "under_review", "revision_required", "accepted", "rejected"],
      default: "submitted",
      index: true,
    },
    submitted_at: { type: Date, default: Date.now, index: true },
    updated_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);


const footerSettingsSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    address: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    social: {
      facebook: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    status: { type: String, enum: ["active", "inactive"], default: "active", index: true },
  },
  timestampOptions
);

function model(name, schema, collection) {
  return mongoose.models[name] || mongoose.model(name, schema, collection);
}

module.exports = {
  Counter: model("Counter", counterSchema, "counters"),
  User: model("User", userSchema, "users"),
  University: model("University", universitySchema, "universities"),
  Journal: model("Journal", journalSchema, "journals"),
  Conference: model("Conference", conferenceSchema, "conferences"),
  Enquiry: model("Enquiry", enquirySchema, "contact_enquiries"),
  Manuscript: model("Manuscript", manuscriptSchema, "manuscript_submissions"),
  FooterSettings: model("FooterSettings", footerSettingsSchema, "footer_settings"),
};
