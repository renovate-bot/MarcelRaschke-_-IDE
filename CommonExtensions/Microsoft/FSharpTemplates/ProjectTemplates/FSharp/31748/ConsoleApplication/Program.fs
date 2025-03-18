// 前往 http://docs.microsoft.com/dotnet/fsharp 深入了解 F#
// 請參閱「F# 教學課程」專案，取得更多說明。

// Define a function to construct a message to print
let from whom =
    sprintf "from %s" whom

[<EntryPoint>]
let main argv =
    let message = from "F#" // Call the function
    printfn "Hello world %s" message
    0 // 傳回整數的結束代碼
