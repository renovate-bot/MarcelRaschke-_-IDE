// Saiba mais sobre F# em http://docs.microsoft.com/dotnet/fsharp
// Veja o projeto 'F# Tutorial' para obter mais ajuda.

// Define a function to construct a message to print
let from whom =
    sprintf "from %s" whom

[<EntryPoint>]
let main argv =
    let message = from "F#" // Call the function
    printfn "Hello world %s" message
    0 // retornar um código de saída inteiro
