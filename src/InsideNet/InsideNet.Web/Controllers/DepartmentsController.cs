using System;
using AutoMapper;
using InsideNet.Services;
using InsideNet.Web.Auth;
using InsideNet.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace InsideNet.Web.Controllers;

[ApiController]
[Authentication]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
    private readonly DepartmentsService departmentsService;
    private readonly IMapper mapper;

    public DepartmentsController(DepartmentsService departmentsService, IMapper mapper)
    {
        this.departmentsService = departmentsService;
        this.mapper = mapper;
    }

    [HttpGet("{id}")]
    public DepartmentModel Get(Guid id)
    {
        return mapper.Map<DepartmentModel>(departmentsService.Get(id));
    }

    [HttpGet("all")]
    public DepartmentModel[] GetAll()
    {
        return mapper.Map<DepartmentModel[]>(departmentsService.GetAll());
    }
}
