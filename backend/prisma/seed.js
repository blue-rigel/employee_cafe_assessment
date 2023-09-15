import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
  const cafeData = [
    {
      name: "Tiong Bahru Bakery",
      description:
        "A popular bakery known for its French-inspired pastries, such as croissants, pains au chocolat, and macarons.",
      location: "56 Eng Hoon St, #01-04, Singapore 160056",
    },
    {
      name: "PS. Cafe at Katong",
      description:
        "A stylish cafe with a menu that includes both Western and Asian dishes, as well as a wide selection of desserts and drinks.",
      location: "112 E Coast Rd, #01-01/02/03 i12 Katong, Singapore 428802",
    },
    {
      name: "Oriole Coffee + Bar",
      description:
        "A specialty coffee shop with a focus on sustainability and ethical sourcing. Oriole also offers a small food menu, including sandwiches, salads, and pastries.",
      location: "126 Telok Ayer St, Singapore 068591",
    },
    {
      name: "The Coffee Academics",
      description:
        "A coffee shop and roastery that serves a variety of coffee drinks, as well as a small food menu. The Coffee Academics also offers coffee brewing classes and workshops.",
      location:
        "10 Collyer Quay, #01-03 Ocean Financial Centre, Singapore 049315",
    },
    {
      name: "Symmetry",
      description:
        "A cafe and bar located in a historic shophouse in Kampong Glam. Symmetry serves a variety of coffee drinks, cocktails, and small plates.",
      location: "38 Haji Lane, Singapore 189233",
    },
  ];
  await prisma.cafe.createMany({
    data: cafeData,
    skipDuplicates: true,
  });

  const employeeData = [];

  for (let i = 0; i < 50; i++) {
    const fname = faker.person.firstName();
    const lname = faker.person.lastName();
    const gender = faker.person.sex();
    employeeData.push({
      id: `UI${faker.string.alphanumeric({ casing: "upper", length: 7 })}`,
      name: `${fname} ${lname}`,
      email_address: faker.internet.email({
        firstName: fname,
        lastName: lname,
      }),
      phone_number: faker.phone.number("9########"),
      gender: gender.charAt(0).toUpperCase() + gender.slice(1),
    });
  }

  await prisma.employee.createMany({
    data: employeeData,
  });

  const cafe = await prisma.cafe.findMany({
    select: {
      id: true,
    },
  });

  const employee = await prisma.employee.findMany({
    select: {
      id: true,
    },
  });

  const employeeCafe = [];

  for (let emp of employee) {
    employeeCafe.push({
      employeeId: emp.id,
      cafeId: cafe[faker.number.int({ min: 0, max: 4 })].id,
      start_date: faker.date.recent(),
    });
  }

  await prisma.employeeCafe.createMany({
    data: employeeCafe,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
