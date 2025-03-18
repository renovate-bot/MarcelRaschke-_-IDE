// http://docs.microsoft.com/dotnet/fsharp에서 F#에 대해 자세히 알아보기
// 자세한 도움말은 'F# 자습서' 프로젝트를 참조하세요.

// Define a function to construct a message to print
let from whom =
    sprintf "from %s" whom

[<EntryPoint>]
let main argv =
    let message = from "F#" // Call the function
    printfn "Hello world %s" message
    0 // 정수 종료 코드 반환
