// Dowiedz się więcej o języku F# na stronie http://docs.microsoft.com/dotnet/fsharp
// Aby uzyskać dodatkową pomoc, zobacz projekt „Samouczek języka F#”.

// Define a function to construct a message to print
let from whom =
    sprintf "from %s" whom

[<EntryPoint>]
let main argv =
    let message = from "F#" // Call the function
    printfn "Hello world %s" message
    0 // zwracanie kodu zakończenia w postaci liczby całkowitej
