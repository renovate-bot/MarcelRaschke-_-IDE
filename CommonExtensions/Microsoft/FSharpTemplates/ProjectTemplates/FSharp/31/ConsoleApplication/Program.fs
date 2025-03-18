// F# hakkında daha fazla bilgi için bkz. http://docs.microsoft.com/dotnet/fsharp
// Daha fazla yardım almak için 'F# Öğreticisi' projesine göz atın.

// Define a function to construct a message to print
let from whom =
    sprintf "from %s" whom

[<EntryPoint>]
let main argv =
    let message = from "F#" // Call the function
    printfn "Hello world %s" message
    0 // bir tamsayı çıkış kodu döndürür
