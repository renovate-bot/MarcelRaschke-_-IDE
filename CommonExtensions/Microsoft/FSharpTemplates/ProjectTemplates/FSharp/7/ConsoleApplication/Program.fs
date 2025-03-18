// Weitere Informationen zu F# finden Sie unter http://docs.microsoft.com/dotnet/fsharp.
// Weitere Hilfe finden Sie im Projekt "F#-Tutorial".

// Define a function to construct a message to print
let from whom =
    sprintf "from %s" whom

[<EntryPoint>]
let main argv =
    let message = from "F#" // Call the function
    printfn "Hello world %s" message
    0 // Integer-Exitcode zurückgeben
