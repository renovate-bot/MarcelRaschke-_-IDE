// En savoir plus sur F# via http://docs.microsoft.com/dotnet/fsharp
// Voir le projet 'Didacticiel F#' pour obtenir de l'aide.

// Define a function to construct a message to print
let from whom =
    sprintf "from %s" whom

[<EntryPoint>]
let main argv =
    let message = from "F#" // Call the function
    printfn "Hello world %s" message
    0 // retourne du code de sortie entier
