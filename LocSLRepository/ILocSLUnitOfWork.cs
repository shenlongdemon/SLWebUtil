using SL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LocSLRepository
{
    public interface ILocSLUnitOfWork : IUnitOfWork
    {
        IMyPlacesRepository MyPlacesRepository { get; }
    }
}