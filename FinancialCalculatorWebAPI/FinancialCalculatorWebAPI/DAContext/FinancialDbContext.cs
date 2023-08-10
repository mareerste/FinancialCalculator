﻿using FinancialCalculatorWebAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace FinancialCalculatorWebAPI.DAContext
{
    public class FinancialDbContext : DbContext
    {
        public FinancialDbContext(DbContextOptions option) : base(option)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<ExpenseCategory> ExpenseCategories { get; set; }
        public DbSet<Expense> Expenses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Expense>()
                .HasOne(e => e.User)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.Category)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
