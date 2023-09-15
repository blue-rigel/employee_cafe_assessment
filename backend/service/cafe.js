import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function CreateCafe(request, _reply) {
  const { name, description, location } = request.body;
  try {
    await prisma.cafe.create({
      data: {
        name,
        description,
        location,
      },
    });
    return {
      status: "success",
      message: "Cafe created successfully",
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: "Failed to create cafe",
    };
  }
}

export async function UpdateCafe(request, _reply) {
  const { id, name, description, location } = request.body;
  try {
    await prisma.cafe.update({
      data: {
        name,
        description,
        location,
      },
      where: {
        id,
      },
    });
    return {
      status: "success",
      message: "Cafe updated successfully",
    };
  } catch (err) {
    return {
      status: "error",
      message: err?.meta?.cause || "Failed to update cafe",
    };
  }
}

export async function DeleteCafe(request, _reply) {
  const { id } = request.body;
  try {
    const employees = await prisma.employee.findMany({
      where: {
        cafe: {
          some: {
            cafeId: id,
          },
        }
      },
      select: {
        id: true,
      }
    })
    await prisma.employeeCafe.deleteMany({
      where: {
        cafeId: id,
      }
    })
    await prisma.employee.deleteMany({
      where: {
        id: {
          in: employees.map(employee => employee.id)
        }
      }
    })
    await prisma.cafe.delete({
      where: {
        id,
      },
    });
    return {
      status: "success",
      message: "Cafe deleted successfully",
    };
  } catch (err) {
    return {
      status: "error",
      message: err?.meta?.cause || "Failed to delete cafe",
    };
  }
}

export async function GetCafes(request, _reply) {
  const { location } = request.query;

  try {
    const cafes = await prisma.cafe.findMany({
      where: {
        ...(location
          ? {
            location: {
              search: location,
            },
          }
          : {}),
      },
      select: {
        _count: {
          select: {
            employees: true,
          },
        },
        id: true,
        name: true,
        description: true,
        location: true,
      },
    });
    // Manual Sort since ORM doesn't support nested count sort
    const sortedCafes = cafes.sort(
      (a, b) => b._count.employees - a._count.employees
    );
    return {
      status: "success",
      data: sortedCafes.map((cafe) => ({
        ...cafe,
        employees: cafe._count.employees,
      })),
    };
  } catch (err) {
    return {
      status: "error",
      message: err?.meta?.cause || "Failed to get cafes",
    };
  }
}
