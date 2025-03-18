// F# の詳細については、http://docs.microsoft.com/dotnet/fsharp をご覧ください
// 詳細については、'F# チュートリアル' プロジェクトを参照してください。

// Define a function to construct a message to print
let from whom =
    sprintf "from %s" whom

[<EntryPoint>]
let main argv =
    let message = from "F#" // Call the function
    printfn "Hello world %s" message
    0 // 整数の終了コードを返します
