namespace BuberBreakfast.Contracts.BuberBreakfast;

public record UpsertBreakfastRequest(
    string Name,
    string Description,
    DateTime StartDate,
    DateTime EndDateTime,
    List<string> Savory,
    List<string> Sweet
);