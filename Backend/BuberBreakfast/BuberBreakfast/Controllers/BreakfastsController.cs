using BuberBreakfast.Contracts.BuberBreakfast;
using BuberBreakfast.Models;
using BuberBreakfast.ServiceErrors;
using BuberBreakfast.Services.Breakfasts;
using ErrorOr;
using Microsoft.AspNetCore.Mvc;

namespace BuberBreakfast.Controllers;


public class BreakfastController : ApiController
{
    private readonly IBreakfastService _breakfastService;
    public BreakfastController(IBreakfastService breakfastService)
    {
        _breakfastService = breakfastService;
    }

    [HttpPost]
    public IActionResult CreateBreakfast(CreateBreakfastRequest request)
    {
        ErrorOr<Breakfast> requestToBreakfastResult = Breakfast.From(request);

        if(requestToBreakfastResult.IsError){
            return Problem(requestToBreakfastResult.Errors);
        }

        var breakfast = requestToBreakfastResult.Value;
        ErrorOr<Created> createBreakfastResult = _breakfastService.CreateBreakfast(breakfast);

        return createBreakfastResult.Match(
            created => CreatedAtGetBreakfast(breakfast),
            errors => Problem(errors)
        );
    }

    [HttpGet("{id:guid}")]
    public IActionResult GetBreakfast(Guid id)
    {
        ErrorOr<Breakfast> getBreakfastResult = _breakfastService.GetBreakfast(id);

        return getBreakfastResult.Match(
            breakfast => Ok(MapBreakfastResponse(breakfast)),
            errors => Problem(errors)
        );

       
    }

    [HttpGet]
    public IActionResult GetAllBreakfast()
    {
        ErrorOr<List<Breakfast>> getBreakfastResult = _breakfastService.GetAllBreakfast();
        List<BreakfastResponse> result = new List<BreakfastResponse>();
        foreach (var breakfast in getBreakfastResult.Value)
        {
            result.Add(MapBreakfastResponse(breakfast));
        }

        return getBreakfastResult.Match(
            breakfast => Ok(result),
            errors => Problem(errors)
        );


    }

    [HttpPut("{id:guid}")]
    public IActionResult UpsertBreakfast(Guid id, UpsertBreakfastRequest request)
    {
        ErrorOr<Breakfast> requestToBreakfastResult = Breakfast.From(id, request);

        if(requestToBreakfastResult.IsError)
        {
            return Problem(requestToBreakfastResult.Errors);
        }
        var breakfast = requestToBreakfastResult.Value;
        ErrorOr<UpsertedBreakfast> upsertedResult = _breakfastService.UpsertBreakfast(breakfast);
        
       return upsertedResult.Match(
        upserted => upserted.IsNewlyCreated ? CreatedAtGetBreakfast(breakfast) : NoContent(),
        errors => Problem(errors)
       );
    }

    [HttpDelete("{id:guid}")]
    public IActionResult DeleteBreakfast(Guid id)
    {
        ErrorOr<Deleted> deletedResult = _breakfastService.DeleteBreakfast(id);
        
        return deletedResult.Match(
            deleted => NoContent(),
            errors => Problem(errors)
        );
        
    }

    private CreatedAtActionResult CreatedAtGetBreakfast(Breakfast breakfast)
    {
        return CreatedAtAction(
            actionName: nameof(GetBreakfast),
            routeValues: new { id = breakfast.Id },
            value: MapBreakfastResponse(breakfast));
    }
    
    private static BreakfastResponse MapBreakfastResponse(Breakfast breakfast)
    {
        return new BreakfastResponse(
                  breakfast.Id,
                  breakfast.Name,
                  breakfast.Description,
                  breakfast.StartDateTime,
                  breakfast.EndDateTime,
                  breakfast.LastModifiedDateTime,
                  breakfast.Savory,
                  breakfast.Sweet,
                  breakfast.ImageURL
                );
    }
}