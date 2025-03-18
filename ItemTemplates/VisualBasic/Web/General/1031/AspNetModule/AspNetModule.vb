Imports System.Web
Public Class $safeitemrootname$ 
    Implements IHttpModule

    Private WithEvents _context As HttpApplication

    ''' <summary>
    '''  Sie müssen dieses Modul in der Datei "Web.config" Ihres
    '''  Webs konfigurieren und bei IIS registrieren, bevor Sie ihn verwenden können. Weitere Informationen
    '''  finden Sie unter https://go.microsoft.com/?linkid=8101007
    ''' </summary>
#Region "IHttpModule-Elemente"

    Public Sub Dispose() Implements IHttpModule.Dispose

        ' Bereinigungscode hier

    End Sub

    Public Sub Init(ByVal context As HttpApplication) Implements IHttpModule.Init
        _context = context
    End Sub

#End Region

    Public Sub OnLogRequest(ByVal source As Object, ByVal e As EventArgs) Handles _context.LogRequest

        ' Verarbeitet das Ereignis "LogRequest", um eine benutzerdefinierte Protokollierungs
        'implementierung bereitzustellen

    End Sub
End Class
