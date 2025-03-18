// Más información sobre F# en http://docs.microsoft.com/dotnet/fsharp
// Vea el proyecto "Tutorial de F#" para obtener más ayuda.

// Define a function to construct a message to print
let from whom =
    sprintf "from %s" whom

[<EntryPoint>]
let main argv =
    let message = from "F#" // Call the function
    printfn "Hello world %s" message
    0 // devolver un código de salida entero
