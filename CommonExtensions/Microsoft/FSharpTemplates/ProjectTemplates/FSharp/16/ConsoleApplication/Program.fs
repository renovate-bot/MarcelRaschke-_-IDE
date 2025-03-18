// Per altre informazioni su F#, vedere http://docs.microsoft.com/dotnet/fsharp
// Per altre informazioni, vedere il progetto 'Esercitazione su F#'.

// Define a function to construct a message to print
let from whom =
    sprintf "from %s" whom

[<EntryPoint>]
let main argv =
    let message = from "F#" // Call the function
    printfn "Hello world %s" message
    0 // restituisce un intero come codice di uscita
