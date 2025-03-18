// 通过 http://docs.microsoft.com/dotnet/fsharp 详细了解 F#
// 请参阅“F# 教程”项目以获取更多帮助。

// Define a function to construct a message to print
let from whom =
    sprintf "from %s" whom

[<EntryPoint>]
let main argv =
    let message = from "F#" // Call the function
    printfn "Hello world %s" message
    0 // 返回整数退出代码
