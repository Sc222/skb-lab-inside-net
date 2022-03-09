using System;
using Storage;
using Storage.Entities;

namespace InsideNet.Services;

public class DepartmentsService
{
    private readonly IRepository<Department> departments;

    public DepartmentsService(IRepository<Department> departments)
    {
        this.departments = departments;
    }

    public Department Get(Guid id)
    {
        return departments.Get(id);
    }

    public Department[] GetAll()
    {
        return departments.GetAll();
    }
}
