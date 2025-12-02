import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

// Parse DATABASE_URL for MariaDB adapter
const url = process.env.DATABASE_URL || '';
const regex = /mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
const match = regex.exec(url);

let prisma: PrismaClient;

if (match) {
  const [, user, password, host, port, database] = match;
  const adapter = new PrismaMariaDb({
    host,
    port: Number.parseInt(port, 10),
    user,
    password,
    database,
    connectionLimit: 10,
  });
  prisma = new PrismaClient({ adapter });
} else {
  const adapter = new PrismaMariaDb({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'nsr_population_tracker',
    connectionLimit: 10,
  });
  prisma = new PrismaClient({ adapter });
}

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data (in reverse order of dependencies)
  await prisma.auditTrail.deleteMany();
  await prisma.resident.deleteMany();
  await prisma.household.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.account.deleteMany();

  console.log('✅ Cleared existing data');

  // Insert admin accounts
  const adminAccount = await prisma.account.create({
    data: {
      username: 'admin',
      password: 'admin123', // Note: Plain text for simplicity. Use bcrypt in production!
      role: 'admin',
    },
  });

  await prisma.account.create({
    data: {
      username: 'staff1',
      password: 'staff123',
      role: 'staff',
    },
  });

  console.log('✅ Created accounts');

  // Insert staff members
  const staffMembers = await Promise.all([
    prisma.staff.create({
      data: {
        firstName: 'Maria',
        lastName: 'Santos',
        title: 'Barangay Captain',
        picture: null,
      },
    }),
    prisma.staff.create({
      data: {
        firstName: 'Jose',
        lastName: 'Reyes',
        title: 'Barangay Secretary',
        picture: null,
      },
    }),
    prisma.staff.create({
      data: {
        firstName: 'Ana',
        lastName: 'Cruz',
        title: 'Barangay Treasurer',
        picture: null,
      },
    }),
    prisma.staff.create({
      data: {
        firstName: 'Carlos',
        lastName: 'Garcia',
        title: 'Barangay Councilor',
        picture: null,
      },
    }),
    prisma.staff.create({
      data: {
        firstName: 'Rosa',
        lastName: 'Martinez',
        title: 'Health Worker',
        picture: null,
      },
    }),
  ]);

  console.log('✅ Created staff members');

  // Insert households
  const householdsData = [
    { zoneNum: 1, houseNum: '001-A', address: 'Purok 1, New San Roque' },
    { zoneNum: 1, houseNum: '002-B', address: 'Purok 1, New San Roque' },
    { zoneNum: 2, houseNum: '001-A', address: 'Purok 2, New San Roque' },
    { zoneNum: 2, houseNum: '002-C', address: 'Purok 2, New San Roque' },
    { zoneNum: 3, houseNum: '001-D', address: 'Purok 3, New San Roque' },
    { zoneNum: 3, houseNum: '002-A', address: 'Purok 3, New San Roque' },
    { zoneNum: 4, houseNum: '001-B', address: 'Purok 4, New San Roque' },
    { zoneNum: 4, houseNum: '002-E', address: 'Purok 4, New San Roque' },
    { zoneNum: 5, houseNum: '001-F', address: 'Purok 5, New San Roque' },
    { zoneNum: 5, houseNum: '002-A', address: 'Purok 5, New San Roque' },
  ];

  const households: Record<
    string,
    Awaited<ReturnType<typeof prisma.household.create>>
  > = {};

  for (const h of householdsData) {
    const key = `${h.zoneNum}-${h.houseNum}`;
    households[key] = await prisma.household.create({
      data: {
        zoneNum: h.zoneNum,
        houseNum: h.houseNum,
        address: h.address,
        status: 'active',
      },
    });
  }

  console.log('✅ Created households');

  // Insert residents
  type ResidentData = {
    householdKey: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: 'male' | 'female';
    civilStatus: 'single' | 'married' | 'widowed' | 'separated' | 'divorced';
    educationalAttainment: string;
    contactNumber: string | null;
  };

  const residentsData: ResidentData[] = [
    // Household 1 (Zone 1, House 001-A)
    {
      householdKey: '1-001-A',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      birthDate: '1975-05-15',
      gender: 'male',
      civilStatus: 'married',
      educationalAttainment: 'High School Graduate',
      contactNumber: '09171234567',
    },
    {
      householdKey: '1-001-A',
      firstName: 'Maria',
      lastName: 'Dela Cruz',
      birthDate: '1978-08-22',
      gender: 'female',
      civilStatus: 'married',
      educationalAttainment: 'College Graduate',
      contactNumber: '09181234567',
    },
    {
      householdKey: '1-001-A',
      firstName: 'Jose',
      lastName: 'Dela Cruz',
      birthDate: '2005-03-10',
      gender: 'male',
      civilStatus: 'single',
      educationalAttainment: 'High School Level',
      contactNumber: null,
    },
    {
      householdKey: '1-001-A',
      firstName: 'Ana',
      lastName: 'Dela Cruz',
      birthDate: '2008-11-28',
      gender: 'female',
      civilStatus: 'single',
      educationalAttainment: 'Elementary Level',
      contactNumber: null,
    },

    // Household 2 (Zone 1, House 002-B)
    {
      householdKey: '1-002-B',
      firstName: 'Pedro',
      lastName: 'Santos',
      birthDate: '1980-02-14',
      gender: 'male',
      civilStatus: 'married',
      educationalAttainment: 'College Graduate',
      contactNumber: '09191234567',
    },
    {
      householdKey: '1-002-B',
      firstName: 'Rosa',
      lastName: 'Santos',
      birthDate: '1982-07-19',
      gender: 'female',
      civilStatus: 'married',
      educationalAttainment: 'High School Graduate',
      contactNumber: '09201234567',
    },
    {
      householdKey: '1-002-B',
      firstName: 'Miguel',
      lastName: 'Santos',
      birthDate: '2010-09-05',
      gender: 'male',
      civilStatus: 'single',
      educationalAttainment: 'Elementary Level',
      contactNumber: null,
    },

    // Household 3 (Zone 2, House 001-A)
    {
      householdKey: '2-001-A',
      firstName: 'Antonio',
      lastName: 'Gonzales',
      birthDate: '1970-12-25',
      gender: 'male',
      civilStatus: 'married',
      educationalAttainment: 'Elementary Graduate',
      contactNumber: '09211234567',
    },
    {
      householdKey: '2-001-A',
      firstName: 'Carmen',
      lastName: 'Gonzales',
      birthDate: '1972-04-30',
      gender: 'female',
      civilStatus: 'married',
      educationalAttainment: 'High School Graduate',
      contactNumber: '09221234567',
    },
    {
      householdKey: '2-001-A',
      firstName: 'Roberto',
      lastName: 'Gonzales',
      birthDate: '2000-06-15',
      gender: 'male',
      civilStatus: 'single',
      educationalAttainment: 'College Level',
      contactNumber: '09231234567',
    },
    {
      householdKey: '2-001-A',
      firstName: 'Elena',
      lastName: 'Gonzales',
      birthDate: '2003-01-20',
      gender: 'female',
      civilStatus: 'single',
      educationalAttainment: 'High School Graduate',
      contactNumber: null,
    },

    // Household 4 (Zone 2, House 002-C)
    {
      householdKey: '2-002-C',
      firstName: 'Carlos',
      lastName: 'Reyes',
      birthDate: '1985-08-08',
      gender: 'male',
      civilStatus: 'single',
      educationalAttainment: 'College Graduate',
      contactNumber: '09241234567',
    },

    // Household 5 (Zone 3, House 001-D)
    {
      householdKey: '3-001-D',
      firstName: 'Fernando',
      lastName: 'Martinez',
      birthDate: '1968-03-17',
      gender: 'male',
      civilStatus: 'married',
      educationalAttainment: 'Elementary Graduate',
      contactNumber: '09251234567',
    },
    {
      householdKey: '3-001-D',
      firstName: 'Gloria',
      lastName: 'Martinez',
      birthDate: '1970-09-12',
      gender: 'female',
      civilStatus: 'married',
      educationalAttainment: 'High School Graduate',
      contactNumber: '09261234567',
    },
    {
      householdKey: '3-001-D',
      firstName: 'Ramon',
      lastName: 'Martinez',
      birthDate: '1998-11-03',
      gender: 'male',
      civilStatus: 'married',
      educationalAttainment: 'Vocational Graduate',
      contactNumber: '09271234567',
    },
    {
      householdKey: '3-001-D',
      firstName: 'Lisa',
      lastName: 'Martinez',
      birthDate: '2000-05-08',
      gender: 'female',
      civilStatus: 'married',
      educationalAttainment: 'College Graduate',
      contactNumber: '09281234567',
    },

    // Household 6 (Zone 3, House 002-A)
    {
      householdKey: '3-002-A',
      firstName: 'Ricardo',
      lastName: 'Castillo',
      birthDate: '1983-07-22',
      gender: 'male',
      civilStatus: 'married',
      educationalAttainment: 'Vocational Graduate',
      contactNumber: '09291234567',
    },
    {
      householdKey: '3-002-A',
      firstName: 'Teresa',
      lastName: 'Castillo',
      birthDate: '1985-12-14',
      gender: 'female',
      civilStatus: 'married',
      educationalAttainment: 'College Graduate',
      contactNumber: '09301234567',
    },
    {
      householdKey: '3-002-A',
      firstName: 'Daniel',
      lastName: 'Castillo',
      birthDate: '2012-02-28',
      gender: 'male',
      civilStatus: 'single',
      educationalAttainment: 'Elementary Level',
      contactNumber: null,
    },
    {
      householdKey: '3-002-A',
      firstName: 'Sofia',
      lastName: 'Castillo',
      birthDate: '2015-08-19',
      gender: 'female',
      civilStatus: 'single',
      educationalAttainment: 'Elementary Level',
      contactNumber: null,
    },

    // Household 7 (Zone 4, House 001-B)
    {
      householdKey: '4-001-B',
      firstName: 'Alfredo',
      lastName: 'Flores',
      birthDate: '1977-10-05',
      gender: 'male',
      civilStatus: 'widowed',
      educationalAttainment: 'High School Graduate',
      contactNumber: '09311234567',
    },
    {
      householdKey: '4-001-B',
      firstName: 'Luis',
      lastName: 'Flores',
      birthDate: '2004-04-12',
      gender: 'male',
      civilStatus: 'single',
      educationalAttainment: 'High School Level',
      contactNumber: null,
    },
    {
      householdKey: '4-001-B',
      firstName: 'Patricia',
      lastName: 'Flores',
      birthDate: '2007-06-25',
      gender: 'female',
      civilStatus: 'single',
      educationalAttainment: 'Elementary Level',
      contactNumber: null,
    },

    // Household 8 (Zone 4, House 002-E)
    {
      householdKey: '4-002-E',
      firstName: 'Manuel',
      lastName: 'Garcia',
      birthDate: '1990-01-30',
      gender: 'male',
      civilStatus: 'married',
      educationalAttainment: 'Vocational Graduate',
      contactNumber: '09321234567',
    },
    {
      householdKey: '4-002-E',
      firstName: 'Angela',
      lastName: 'Garcia',
      birthDate: '1992-03-18',
      gender: 'female',
      civilStatus: 'married',
      educationalAttainment: 'College Graduate',
      contactNumber: '09331234567',
    },

    // Household 9 (Zone 5, House 001-F)
    {
      householdKey: '5-001-F',
      firstName: 'Rodrigo',
      lastName: 'Lopez',
      birthDate: '1973-05-28',
      gender: 'male',
      civilStatus: 'married',
      educationalAttainment: 'Elementary Graduate',
      contactNumber: '09341234567',
    },
    {
      householdKey: '5-001-F',
      firstName: 'Luz',
      lastName: 'Lopez',
      birthDate: '1975-11-09',
      gender: 'female',
      civilStatus: 'married',
      educationalAttainment: 'High School Graduate',
      contactNumber: '09351234567',
    },
    {
      householdKey: '5-001-F',
      firstName: 'Benjamin',
      lastName: 'Lopez',
      birthDate: '2001-07-14',
      gender: 'male',
      civilStatus: 'single',
      educationalAttainment: 'College Level',
      contactNumber: '09361234567',
    },
    {
      householdKey: '5-001-F',
      firstName: 'Isabella',
      lastName: 'Lopez',
      birthDate: '2006-09-22',
      gender: 'female',
      civilStatus: 'single',
      educationalAttainment: 'Elementary Level',
      contactNumber: null,
    },
    {
      householdKey: '5-001-F',
      firstName: 'Gabriel',
      lastName: 'Lopez',
      birthDate: '2009-12-01',
      gender: 'male',
      civilStatus: 'single',
      educationalAttainment: 'Elementary Level',
      contactNumber: null,
    },

    // Household 10 (Zone 5, House 002-A)
    {
      householdKey: '5-002-A',
      firstName: 'Eduardo',
      lastName: 'Rivera',
      birthDate: '1987-02-11',
      gender: 'male',
      civilStatus: 'married',
      educationalAttainment: 'College Graduate',
      contactNumber: '09371234567',
    },
    {
      householdKey: '5-002-A',
      firstName: 'Cristina',
      lastName: 'Rivera',
      birthDate: '1989-08-04',
      gender: 'female',
      civilStatus: 'married',
      educationalAttainment: 'College Graduate',
      contactNumber: '09381234567',
    },
    {
      householdKey: '5-002-A',
      firstName: 'Marco',
      lastName: 'Rivera',
      birthDate: '2013-10-17',
      gender: 'male',
      civilStatus: 'single',
      educationalAttainment: 'Elementary Level',
      contactNumber: null,
    },
  ];

  const residents: Record<
    string,
    Awaited<ReturnType<typeof prisma.resident.create>>
  > = {};

  for (const r of residentsData) {
    const household = households[r.householdKey];
    const resident = await prisma.resident.create({
      data: {
        householdId: household.householdId,
        firstName: r.firstName,
        lastName: r.lastName,
        birthDate: new Date(r.birthDate),
        gender: r.gender,
        civilStatus: r.civilStatus,
        educationalAttainment: r.educationalAttainment,
        contactNumber: r.contactNumber,
        email: null,
        status: 'active',
      },
    });
    residents[`${r.firstName}-${r.lastName}`] = resident;
  }

  console.log('✅ Created residents');

  // Update households with head_resident_id
  const headResidents: Record<string, string> = {
    '1-001-A': 'Juan-Dela Cruz',
    '1-002-B': 'Pedro-Santos',
    '2-001-A': 'Antonio-Gonzales',
    '2-002-C': 'Carlos-Reyes',
    '3-001-D': 'Fernando-Martinez',
    '3-002-A': 'Ricardo-Castillo',
    '4-001-B': 'Alfredo-Flores',
    '4-002-E': 'Manuel-Garcia',
    '5-001-F': 'Rodrigo-Lopez',
    '5-002-A': 'Eduardo-Rivera',
  };

  for (const [householdKey, residentKey] of Object.entries(headResidents)) {
    const household = households[householdKey];
    const resident = residents[residentKey];
    if (household && resident) {
      await prisma.household.update({
        where: { householdId: household.householdId },
        data: { headResidentId: resident.residentId },
      });
    }
  }

  console.log('✅ Updated household heads');

  // Insert sample audit trail entries
  const auditEntries = [
    {
      recordType: 'household' as const,
      recordId: households['1-001-A'].householdId,
      details: 'Initial household registration',
      changeType: 'create' as const,
    },
    {
      recordType: 'household' as const,
      recordId: households['1-002-B'].householdId,
      details: 'Initial household registration',
      changeType: 'create' as const,
    },
    {
      recordType: 'resident' as const,
      recordId: residents['Juan-Dela Cruz'].residentId,
      details: 'Initial resident registration',
      changeType: 'create' as const,
    },
    {
      recordType: 'resident' as const,
      recordId: residents['Maria-Dela Cruz'].residentId,
      details: 'Initial resident registration',
      changeType: 'create' as const,
    },
    {
      recordType: 'staff' as const,
      recordId: staffMembers[0].staffId,
      details: 'Staff member added',
      changeType: 'create' as const,
    },
  ];

  for (const entry of auditEntries) {
    await prisma.auditTrail.create({
      data: {
        recordType: entry.recordType,
        recordId: entry.recordId,
        details: entry.details,
        changeType: entry.changeType,
        accId: adminAccount.accId,
      },
    });
  }

  console.log('✅ Created audit trail entries');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
