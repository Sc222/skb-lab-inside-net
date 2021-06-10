using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Storage.Entities;

namespace InsideNet.Web.Models
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Vacation, VacationModel>();
            CreateMap<Role, RoleModel>().ReverseMap();
            CreateMap<AccessRight, AccessRightModel>().ReverseMap();
            CreateMap<Position, PositionModel>().ReverseMap();
            CreateMap<Person, PersonModel>().ForMember(d => d.Password, opt => opt.Ignore()).ReverseMap();
        }
    }
}
