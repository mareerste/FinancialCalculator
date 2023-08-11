using FinancialCalculatorWebAPI.Commands;
using FinancialCalculatorWebAPI.DAContext;
using FinancialCalculatorWebAPI.Repository;
using FinancialCalculatorWebAPI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add MediatR for commands and queries
builder.Services.AddMediatR(config => config.RegisterServicesFromAssembly(typeof(AddUserCommand).Assembly));

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();

// Connecting DBContext to SQL Server
builder.Services.AddDbContext<FinancialDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnString")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
