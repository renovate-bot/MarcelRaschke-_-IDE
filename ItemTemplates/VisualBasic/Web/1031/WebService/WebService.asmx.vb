Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel

$if$ ($targetframeworkversion$ >= 3.5)' Wenn der Aufruf dieses Webdiensts aus einem Skript zulässig sein soll, heben Sie mithilfe von ASP.NET AJAX die Kommentarmarkierung für die folgende Zeile auf.
' <System.Web.Script.Services.ScriptService()> _
$endif$<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
Public Class $classname$
    Inherits System.Web.Services.WebService

    <WebMethod()> _
    Public Function HelloWorld() As String
       Return "Hello World"
    End Function

End Class