// Další informace o jazyce F# najdete tady: http://docs.microsoft.com/dotnet/fsharp
// Pokud potřebujete další nápovědu, viz projekt Výukový kurz F#.

// Define a function to construct a message to print
let from whom =
    sprintf "from %s" whom

[<EntryPoint>]
let main argv =
    let message = from "F#" // Call the function
    printfn "Hello world %s" message
    0 // vrátit celočíselný ukončovací kód
