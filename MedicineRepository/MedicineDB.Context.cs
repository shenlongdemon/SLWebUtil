﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MedicineRepository
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SLWebUtilContext : DbContext
    {
        public SLWebUtilContext()
            : base("name=SLWebUtilContext")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Medicine> Medicines { get; set; }
        public virtual DbSet<UserAccount> UserAccounts { get; set; }
        public virtual DbSet<TokenHistory> TokenHistories { get; set; }
        public virtual DbSet<Patient> Patients { get; set; }
        public virtual DbSet<PatientHistory> PatientHistories { get; set; }
    }
}
