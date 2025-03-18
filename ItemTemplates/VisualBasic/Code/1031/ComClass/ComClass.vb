<ComClass($safeitemname$.ClassId, $safeitemname$.InterfaceId, $safeitemname$.EventsId)> _
Public Class $safeitemname$

#Region "COM-GUIDs"
    ' Diese GUIDs stellen die COM-Identität für diese Klasse 
    ' und ihre COM-Schnittstellen bereit. Wenn Sie sie ändern, können vorhandene 
    ' Clients nicht mehr auf die Klasse zugreifen.
    Public Const ClassId As String = "$guid1$"
    Public Const InterfaceId As String = "$guid2$"
    Public Const EventsId As String = "$guid3$"
#End Region

    ' Eine erstellbare COM-Klasse muss eine Public Sub New() 
    ' ohne Parameter aufweisen. Andernfalls wird die Klasse 
    ' nicht in der COM-Registrierung registriert und kann nicht 
    ' über CreateObject erstellt werden.
    Public Sub New()
        MyBase.New()
    End Sub

End Class


