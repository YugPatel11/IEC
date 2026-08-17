import { query } from './pool';

export async function initDatabase() {
  console.log('Initializing database schema...');

  await query(`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS impact_metrics (
      id SERIAL PRIMARY KEY,
      startups_supported INT DEFAULT 100,
      ipr_supported INT DEFAULT 70,
      students_reached INT DEFAULT 10000,
      mentoring_sessions INT DEFAULT 0,
      programs_conducted INT DEFAULT 0,
      funding_supported VARCHAR(100) DEFAULT '0',
      industry_partners INT DEFAULT 0,
      mentors INT DEFAULT 0,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS startups (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE,
      logo_url TEXT,
      description TEXT NOT NULL,
      problem TEXT,
      solution TEXT,
      founder_name VARCHAR(255) NOT NULL,
      department VARCHAR(255),
      industry VARCHAR(100),
      stage VARCHAR(50),
      year INT,
      founder_type VARCHAR(50),
      support_received TEXT,
      current_status VARCHAR(255),
      impact TEXT,
      external_url TEXT,
      is_published BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS ipr_records (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      applicant_name VARCHAR(255) NOT NULL,
      department VARCHAR(255),
      ipr_type VARCHAR(50),
      year INT,
      status VARCHAR(50) DEFAULT 'Pending',
      description TEXT,
      is_published BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS mentors (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      photo_url TEXT,
      designation VARCHAR(255),
      organization VARCHAR(255),
      expertise TEXT[],
      bio TEXT,
      domain VARCHAR(100),
      is_available BOOLEAN DEFAULT TRUE,
      is_published BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS programs (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      date DATE,
      location VARCHAR(255),
      eligibility TEXT,
      registration_status VARCHAR(50) DEFAULT 'Coming Soon',
      registration_link TEXT,
      image_url TEXT,
      outcome TEXT,
      status VARCHAR(50) DEFAULT 'Draft',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      date DATE,
      time VARCHAR(50),
      venue VARCHAR(255),
      description TEXT,
      category VARCHAR(100),
      registration_status VARCHAR(50) DEFAULT 'Coming Soon',
      registration_link TEXT,
      photo_urls TEXT[],
      report_url TEXT,
      status VARCHAR(50) DEFAULT 'Draft',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS opportunities (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      organization VARCHAR(255),
      category VARCHAR(100),
      deadline DATE,
      eligibility TEXT,
      description TEXT,
      external_link TEXT,
      status VARCHAR(50) DEFAULT 'Open',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS partners (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      logo_url TEXT,
      category VARCHAR(100),
      description TEXT,
      website TEXT,
      is_published BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS success_stories (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      problem TEXT,
      idea TEXT,
      solution TEXT,
      founder_name VARCHAR(255),
      team TEXT,
      ppsu_support TEXT,
      development_journey TEXT,
      current_stage VARCHAR(255),
      impact TEXT,
      photo_url TEXT,
      startup_id INT REFERENCES startups(id) ON DELETE SET NULL,
      status VARCHAR(50) DEFAULT 'Draft',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS resources (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      category VARCHAR(100),
      file_url TEXT,
      external_url TEXT,
      file_type VARCHAR(50),
      status VARCHAR(50) DEFAULT 'Draft',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS ideas (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      mobile VARCHAR(20),
      user_type VARCHAR(50),
      department VARCHAR(255),
      idea_title VARCHAR(255) NOT NULL,
      problem TEXT NOT NULL,
      proposed_solution TEXT NOT NULL,
      current_stage VARCHAR(100),
      team_members TEXT,
      document_url TEXT,
      status VARCHAR(50) DEFAULT 'Submitted',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS incubation_applications (
      id SERIAL PRIMARY KEY,
      founder_name VARCHAR(255) NOT NULL,
      team_info TEXT,
      startup_name VARCHAR(255) NOT NULL,
      problem TEXT NOT NULL,
      solution TEXT NOT NULL,
      target_users TEXT,
      business_model TEXT,
      current_stage VARCHAR(100),
      prototype_status VARCHAR(100),
      ipr_status VARCHAR(100),
      funding_status VARCHAR(100),
      pitch_deck_url TEXT,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      status VARCHAR(50) DEFAULT 'Submitted',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS ipr_requests (
      id SERIAL PRIMARY KEY,
      applicant_name VARCHAR(255) NOT NULL,
      department VARCHAR(255),
      ipr_type VARCHAR(50),
      title TEXT NOT NULL,
      description TEXT,
      existing_disclosure TEXT,
      document_url TEXT,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      status VARCHAR(50) DEFAULT 'Submitted',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS mentor_requests (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      area_of_help TEXT,
      startup_stage VARCHAR(100),
      problem TEXT,
      preferred_domain VARCHAR(100),
      availability TEXT,
      status VARCHAR(50) DEFAULT 'Submitted',
      assigned_mentor_id INT REFERENCES mentors(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS partnerships (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      organization VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      org_type VARCHAR(100),
      partnership_area TEXT,
      message TEXT,
      status VARCHAR(50) DEFAULT 'Submitted',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      user_type VARCHAR(100),
      subject TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // Indexes for performance
  await query(`
    CREATE INDEX IF NOT EXISTS idx_startups_industry ON startups(industry);
    CREATE INDEX IF NOT EXISTS idx_startups_stage ON startups(stage);
    CREATE INDEX IF NOT EXISTS idx_startups_year ON startups(year);
    CREATE INDEX IF NOT EXISTS idx_startups_published ON startups(is_published);
    CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
    CREATE INDEX IF NOT EXISTS idx_opportunities_deadline ON opportunities(deadline);
    CREATE INDEX IF NOT EXISTS idx_ideas_status ON ideas(status);
    CREATE INDEX IF NOT EXISTS idx_incubation_status ON incubation_applications(status);
  `);

  // Seed default impact metrics if table is empty
  const impactCheck = await query('SELECT id FROM impact_metrics LIMIT 1');
  if (impactCheck.rowCount === 0) {
    await query(`INSERT INTO impact_metrics (startups_supported, ipr_supported, students_reached) VALUES (100, 70, 10000)`);
  }

  console.log('✅ Database schema initialized');
}
