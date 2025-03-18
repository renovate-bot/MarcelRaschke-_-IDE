// Дополнительные сведения о F#: http://docs.microsoft.com/dotnet/fsharp
// Дополнительную справку см. в проекте "Учебник по F#".

// Define a function to construct a message to print
let from whom =
    sprintf "from %s" whom

[<EntryPoint>]
let main argv =
    let message = from "F#" // Call the function
    printfn "Hello world %s" message
    0 // возвращение целочисленного кода выхода
