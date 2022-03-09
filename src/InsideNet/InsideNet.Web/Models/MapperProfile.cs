using AutoMapper;
using Storage.Entities;

namespace InsideNet.Web.Models
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Vacation, VacationModel>();
            CreateMap<Role, RoleModel>().ReverseMap();
            CreateMap<Position, PositionModel>().ReverseMap();
            CreateMap<Person, PersonModel>().ForMember(d => d.Password, opt => opt.Ignore()).ReverseMap();
            CreateMap<AccessRequest, AccessRequestModel>().ReverseMap();
            CreateMap<Notification, NotificationModel>().ReverseMap();
            CreateMap<Department, DepartmentModel>().ReverseMap();
        }
    }
}
