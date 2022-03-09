using System;
using AutoMapper;
using InsideNet.Services;
using InsideNet.Web.Auth;
using InsideNet.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Storage.Entities;

namespace InsideNet.Web.Controllers;

[ApiController]
[Authentication]
[Route("api/[controller]")]
public class PositionsController : ControllerBase
{
    private readonly IMapper mapper;
    private readonly PositionsService positionsService;

    public PositionsController(PositionsService positionsService, IMapper mapper)
    {
        this.positionsService = positionsService;
        this.mapper = mapper;
    }

    [HttpGet("{id}")]
    public PositionModel Get(Guid id)
    {
        return mapper.Map<PositionModel>(positionsService.Get(id));
    }

    [HttpGet("all")]
    public PositionModel[] GetAll()
    {
        return mapper.Map<PositionModel[]>(positionsService.GetAll());
    }

    [AccessFor("canEditPositions")]
    [HttpPost("create")]
    public PositionModel Create([FromBody] PositionModel position)
    {
        var entity = mapper.Map<Position>(position);
        return mapper.Map<PositionModel>(positionsService.Create(entity));
    }

    [AccessFor("canEditPositions")]
    [HttpPost("update")]
    public PositionModel Update([FromBody] PositionModel position)
    {
        var entity = mapper.Map<Position>(position);
        return mapper.Map<PositionModel>(positionsService.Update(entity));
    }

    [AccessFor("canEditPositions")]
    [HttpPost("delete")]
    public void Delete([FromBody] PositionModel position)
    {
        positionsService.Delete(position.Id);
    }
}
