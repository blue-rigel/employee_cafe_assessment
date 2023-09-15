import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export async function CreateEmployee(request, _reply) {
  const { id, name, email_address, phone_number, gender, cafeId } =
    request.body;
  try {
    await prisma.employee.create({
      data: {
        id,
        name,
        email_address,
        phone_number,
        gender,
        ...(cafeId ? {
          cafe: {
            create: [
              {
                cafeId,
                start_date: moment().format(),
              },
            ],
          }
        } : {})
      },
    });
    return {
      status: "success",
      message: "Employee created successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: err?.meta?.cause || "Failed to create employee",
    };
  }
}

export async function UpdateEmployee(request, _reply) {
  const { id, name, email_address, phone_number, gender, cafeId } =
    request.body;
  try {
    await prisma.employee.update({
      data: {
        name,
        email_address,
        phone_number,
        gender,
      },
      where: {
        id,
      },
    });

    const employeeCafe = await prisma.employeeCafe.findMany({
      where: {
        employeeId: id,
      },
    });

    if (employeeCafe.length > 0) {
      if (!cafeId) {
        await prisma.employeeCafe.deleteMany({
          where: {
            employeeId: id,
          },
        });
      }

      if (cafeId && cafeId != employeeCafe[0].cafeId) {
        await prisma.employeeCafe.updateMany({
          data: {
            cafeId,
            start_date: moment().format(),
          },
          where: {
            employeeId: id,
          },
        })
      }
    } else {
      await prisma.employeeCafe.create({
        data: {
          employeeId: id,
          cafeId,
          start_date: moment().format(),
        },
      });
    }

    // if (cafeId) {
    //   await prisma.employeeCafe.upsert({
    //     data: {
    //       cafeId,
    //       start_date: moment().format(),
    //     },
    //     where: {
    //       employeeId: id,
    //     },
    //   });
    // }


    return {
      status: "success",
      message: "Employee updated successfully",
    };
  } catch (err) {
    return {
      status: "error",
      message: err?.meta?.cause || "Failed to update employee",
    };
  }
}

export async function DeleteEmployee(request, _reply) {
  const { id } = request.body;
  try {
    await prisma.employeeCafe.deleteMany({
      where: {
        employeeId: id,
      },
    });
    await prisma.employee.delete({
      where: {
        id,
      },
    });

    return {
      status: "success",
      message: "Employee deleted successfully",
    };
  } catch (err) {
    return {
      status: "error",
      message: err?.meta?.cause || "Failed to delete employee",
    };
  }
}

export async function GetEmployees(request, _reply) {
  const { cafe } = request.query;

  try {
    const employees = await prisma.employee.findMany({
      include: {
        cafe: {
          include: {
            cafe: true,
          },
        },
      },
      where: cafe ? {
        cafe: {
          some: {
            cafeId: cafe,
          }
        }
      } : {},
    });

    const parsedEmployees = employees.map((employee) => ({
      ...employee,
      cafe: employee.cafe.length > 0 ? employee.cafe[0].cafe.name : "-",
      cafeId: employee.cafe.length > 0 ? employee.cafe[0].cafeId : null,
      worked: employee.cafe.length > 0 ? moment().diff(moment(employee.cafe[0].start_date), 'days') : 0,
    }))

    return {
      status: "success",
      data: parsedEmployees,
    };

  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: err?.meta?.cause || "Failed to get employees",
    };
  }
}
